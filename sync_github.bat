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
echo [SINKRONISASI] Mengambil update terbaru dari CMS (Jika ada)...
git pull --rebase origin main

echo.
echo [3/3] Menerbangkan data ke Cloud GitHub🚀...
git push origin main

echo.
echo ===================================================
echo DONE! Berhasil tersinkronisasi dengan Server.
echo Netlify butuh sekitar 1-2 menit untuk men-deploy perubahan ini.
echo ===================================================
pause
