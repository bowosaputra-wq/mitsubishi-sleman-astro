#!/bin/bash
# ============================================================
# sync_github.sh — Script sinkronisasi ke GitHub (Linux/macOS)
# Versi bash dari sync_github.bat
#
# Cara pakai:
#   chmod +x sync_github.sh   (hanya perlu sekali)
#   ./sync_github.sh
# ============================================================

set -e  # Stop kalau ada error

# Warna untuk output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}======================================"
echo -e " Mitsubishi Sleman Astro — Git Sync  "
echo -e "======================================${NC}"
echo ""

# Cek apakah ini git repo
if [ ! -d ".git" ]; then
    echo -e "${RED}❌ Error: Folder ini bukan git repository!${NC}"
    echo "   Pastikan Anda menjalankan script dari folder project."
    exit 1
fi

# Ambil perubahan terbaru dari remote dulu
echo -e "${YELLOW}⬇️  Mengambil perubahan dari GitHub (git pull)...${NC}"
git pull origin main
echo ""

# Tampilkan status perubahan
echo -e "${YELLOW}📋 Status perubahan lokal:${NC}"
git status --short
echo ""

# Cek apakah ada perubahan
if [ -z "$(git status --porcelain)" ]; then
    echo -e "${GREEN}✅ Tidak ada perubahan baru. Semua sudah sinkron!${NC}"
    exit 0
fi

# Minta commit message
echo -e "${YELLOW}💬 Masukkan pesan commit (atau tekan Enter untuk default):${NC}"
read -r COMMIT_MSG

if [ -z "$COMMIT_MSG" ]; then
    COMMIT_MSG="Update: $(date '+%Y-%m-%d %H:%M')"
fi

# Stage semua perubahan
echo ""
echo -e "${YELLOW}📦 Staging semua perubahan (git add .)...${NC}"
git add .

# Commit
echo -e "${YELLOW}💾 Menyimpan commit: \"$COMMIT_MSG\"${NC}"
git commit -m "$COMMIT_MSG"

# Push ke GitHub
echo ""
echo -e "${YELLOW}⬆️  Mengirim ke GitHub (git push)...${NC}"
git push origin main

echo ""
echo -e "${GREEN}======================================"
echo -e " ✅ Berhasil sync ke GitHub!            "
echo -e " 🚀 Netlify akan auto-deploy dalam ~1 menit."
echo -e "======================================${NC}"
echo ""
