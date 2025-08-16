@echo off
REM Авто-тесты mod_generator.js
setlocal ENABLEDELAYEDEXPANSION

echo === Test 1: multi (base) ===
echo {"modTypes":["brush","crown"],"userSettings":{"brush":{"d":"0.6"},"crown":{"shade":"A2"}}} > config_multi.json
node backend\src\mod_generator.js --config=config_multi.json --job-id=multi-auto --user=auto
echo ExitCode=%ERRORLEVEL%

echo === Test 2: empty ===
echo {"modTypes":[],"userSettings":{}} > config_empty.json
node backend\src\mod_generator.js --config=config_empty.json --job-id=empty-auto --user=auto
echo ExitCode=%ERRORLEVEL%

echo === Test 3: inline ===
set "CFG={\"modTypes\":[\"brush\"],\"userSettings\":{\"brush\":{\"diameter\":\"0.7\"}}}"
node backend\src\mod_generator.js --config=%CFG% --job-id=inline-auto --user=auto
echo ExitCode=%ERRORLEVEL%

echo === Test 4: bad JSON ===
node backend\src\mod_generator.js --config="{\"modTypes\":[\"brush\",}" --job-id=badjson-auto --user=auto
echo ExitCode=%ERRORLEVEL%

echo === Test 5: no config ===
node backend\src\mod_generator.js --job-id=noconfig-auto --user=auto
echo ExitCode=%ERRORLEVEL%

echo === Test 6: overwrite ===
echo {"modTypes":["brush","crown"],"userSettings":{"brush":{"d":"0.6"},"crown":{"shade":"A2"}}} > config_over1.json
node backend\src\mod_generator.js --config=config_over1.json --job-id=overwrite-auto --user=auto1
for %%F in (backend\output\exocad-mods-overwrite-auto.zip) do @echo SizeBefore=%%~zF
echo {"modTypes":["brush"],"userSettings":{"brush":{"diameter":"0.99"}}} > config_over2.json
node backend\src\mod_generator.js --config=config_over2.json --job-id=overwrite-auto --user=auto2
for %%F in (backend\output\exocad-mods-overwrite-auto.zip) do @echo SizeAfter=%%~zF

echo === Test 7: sanitize bad id ===
node backend\src\mod_generator.js --config=config_multi.json --job-id="bad id" --user=auto
echo ExitCode=%ERRORLEVEL%

echo === Test 8: sanitize good id ===
node backend\src\mod_generator.js --config=config_multi.json --job-id=good_ID-123.ok --user=auto
echo ExitCode=%ERRORLEVEL%

echo === Test 9: BOM ===
powershell -Command "Set-Content -Path config_bom.json -Value '{\"modTypes\":[\"brush\"],\"userSettings\":{\"brush\":{\"diameter\":\"0.55\"}}}' -Encoding utf8"
node backend\src\mod_generator.js --config=config_bom.json --job-id=bom-auto --user=auto
echo ExitCode=%ERRORLEVEL%

echo === DONE ===
endlocal