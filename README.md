# Pipeline Runner

## `/run`
* `POST` method
* Example POST body:
  ```json
  {
    "pipelineConfig": {
      "modules": [
        { "url": "https://id-generator.cloudapps.digital/generate", "method": "GET" },
        { "url": "https://risk-engine.cloudapps.digital/calculate", "method": "POST" },
        { "url": "https://registration-router.cloudapps.digital/newregistration", "method": "POST" }
      ]
    },
    "registrationData": {
      "exampleField1": true,
      "exampleField2": false,
      "exampleField3": 10,
      "exampleField4": "Additional comments"
    },
    "localAuthority": {
      "id": "MAV",
      "name": "Malvern Hills District Council"
    },
    "answerIds": ["001", "998", "TYPE-941", "TYPE-789", "TYPE-222"]
  }
  ```