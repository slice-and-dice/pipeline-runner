const { runModuleService } = require('../../services/');
const store = require('../../store');
const winston = require('winston');

module.exports = async (origPostBody) => {
  winston.info('run.controller called');

  try {
    const pipelineModules = await store.getPipelineConfigModules();
    let tempEnhancedReg = null;

    for (let nextModule of pipelineModules) {
      // if this is the first module in the pipeline, store the post body
      if (!tempEnhancedReg) {
        tempEnhancedReg = origPostBody;
      }

      try {
        const moduleResponse = await runModuleService.run(nextModule, tempEnhancedReg);

        // append new data from the module response to the temp stored reg,
        // and update any existing data fields with the new module response version.
        for (let responseKey of Object.keys(moduleResponse)) {
          tempEnhancedReg[responseKey] = moduleResponse[responseKey];
        }
      }
      catch (err) {
        winston.error(`run.controller error: ${err}`);
      }

      // if the temp stored reg has an ID, and has not yet been sent to the end recipients, save it to the pipeline store
      // this ensures that if the process fails, the data is not lost, but is not re-stored unnecessarily.
      if (tempEnhancedReg.registrationId && !tempEnhancedReg.sentSuccessfully) {
        store.storeReg(tempEnhancedReg);
      }
      // if the temp stored reg has a truthy value for sentSuccessfully, it can be safely deleted
      if (tempEnhancedReg.sentSuccessfully && tempEnhancedReg.registrationId) {
        store.deleteReg(tempEnhancedReg.registrationId);
      }
    }
    winston.info('run.controller successful');
    return 'Pipeline ran';
  }
  catch (err) {
    winston.error(`run.controller error: ${err}`);
    return err;
  }
};