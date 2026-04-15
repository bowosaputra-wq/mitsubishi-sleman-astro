@echo off
color 0A
echo ===================================================
echo     AUTO-SYNC MITSUBISHI SLEMAN KE GITHUB/NETLIFY
echo ===================================================
echo.
echo [1/3] Menyiapkan semua file perubahan...
git add .

echo.
echo [2/3] Menyimpan snapshot perubahan (Commit)...
git commit -m "Update otomatis dari Windows (Push via Script)"

echo.
echo [3/3] Menerbangkan data ke Cloud GitHub🚀...
git push

echo.
echo ===================================================
echo DONE! Berhasil dikirim ke Server.
echo Netlify butuh sekitar 1-2 menit untuk men-deploy perubahan ini.
echo ===================================================
pause
