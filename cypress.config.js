
const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const path = require("path");

module.exports = defineConfig({


  
  e2e: {
    screenshotsFolder: "cypress/screenshots",
    screenshotOnRunFailure: true, 
    video: true,
    videosFolder: 'cypress/videos',
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
        
      );
      return config;
    },
    specPattern: "**/*.feature",
    baseUrl: "https://amphora.net/", 
    cucumber: {
      stepDefinitions: path.join(__dirname, "cypress/support/step_definitions"),
    },
    includeShadowDom: true,
  },
 
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: false,
      json: true,
      timestamp: 'mmddyyyy_HHMMss',
    },
    screenshotsFolder: "cypress/screenshots",
    screenshotOnRunFailure: true, 
    video: true,
    videosFolder: 'cypress/videos',
   
    
  });
 

