@echo on
npm install && .\node_modules\.bin\mocha .\api_tests\specs --timeout 25000 --reporter mocha-junit-reporter --reporter-options mochaFile=./file.xml
EXIT