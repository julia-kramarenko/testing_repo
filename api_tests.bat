@echo on
start npm install
timeout /t 15
start "" cmd.exe /c run_mongo.bat
timeout /t 5
start cmd.exe /c "run_dev.bat"
timeout /t 5
start cmd.exe /c ".\node_modules\.bin\mocha .\api_tests\specs --timeout 25000 --reporter mocha-junit-reporter --reporter-options mochaFile=./file.xml"
timeout /t 5
taskkill /f /im cmd.exe /fi "windowtitle eq run_mongo.bat"
taskkill /FI "WindowTitle eq appLogCollector*" /T /F