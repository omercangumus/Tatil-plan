
        // DevOps Tips
        const devopsTips = [
            "Docker container'larını izole ortamlar olarak düşün - her biri kendi mini sunucusu gibi çalışır!",
            "Terraform'da 'terraform plan' her zaman 'apply'dan önce çalıştır - sürprizlerden kaçın!",
            "Container'lar ephemeral (geçici) olmalı - state'i dışarıda tut, volume'leri kullan.",
            "Infrastructure as Code = Versiyon kontrolü + Tekrarlanabilirlik + Dokümantasyon",
            "AWS'de her zaman en küçük yetkiyi ver - Least Privilege prensibini uygula!",
            "docker-compose.yml dosyanda 'depends_on' kullanarak servis sıralamasını yönet.",
            "Terraform state dosyasını asla elle düzenleme - 'terraform state' komutlarını kullan!",
            "Multi-stage Docker build kullanarak image boyutunu %80'e kadar küçültebilirsin.",
            "AWS'de tag'leri asla atlama - Maliyet takibi ve kaynak yönetimi için kritik!",
            "Bir hata aldığında önce log'lara bak: 'docker logs <container_id>' veya CloudWatch.",
            "Terraform modüllerini DRY (Don't Repeat Yourself) prensibi için kullan.",
            "Security Group'larda 0.0.0.0/0 kullanmaktan kaçın - mümkün olduğunca IP kısıtla!",
            "Docker network'lerini kullanarak container'lar arası güvenli iletişim sağla.",
            "terraform.tfvars dosyasını .gitignore'a ekle - hassas verileri koruma altına al!"
        ];

        // Course Data - Detaylı Görevler (Teori + Pratik)
        const courseData = [
            {
                "week": "1. Hafta: Docker Dünyası",
                "tasks": [
                    {
                        "id": 1,
                        "date": "5-6 Şubat",
                        "title": "Docker Giriş & Temeller",
                        "desc": "Bölüm 1-3: Mimari, Kurulum, CLI komutları.",
                        "challenge": `═══════════════════════════════════════
� TEORİ - Udemy'den İzle (Bölüm 1-3)
═══════════════════════════════════════

Bu videolardan şunları anlamalısın:

💡 Docker Nedir?
→ Docker, uygulamaları "container" denilen izole kutularda çalıştırır
→ Her container kendi dosya sistemi, ağı ve process'leri olan mini bir bilgisayar gibidir
→ VM'den farkı: Container'lar işletim sistemi paylaşır, bu yüzden çok daha hafiftir

💡 Temel Kavramlar:
→ IMAGE: Container'ın şablonu (yemek tarifi gibi)
→ CONTAINER: Çalışan image kopyası (yemeğin kendisi)
→ REGISTRY: Image'ların deposu (Docker Hub gibi)
→ DAEMON: Arka planda çalışan Docker motoru

� Docker Mimarisi:
Client (CLI) → Docker Daemon → Container'lar
                    ↓
              Image Registry

═══════════════════════════════════════
🛠️ PRATİK - Şimdi Uygula!
═══════════════════════════════════════

ADIM 1: Docker Kurulumunu Kontrol Et
┌─────────────────────────────────────┐
│ docker --version                    │
│ docker info                         │
└─────────────────────────────────────┘
→ Versiyon numarası görmezsen Docker yüklü değil demektir

ADIM 2: İlk Container'ı Çalıştır
┌─────────────────────────────────────┐
│ docker run hello-world              │
└─────────────────────────────────────┘
→ Bu komut ne yapar?
  1. "hello-world" image'ını Docker Hub'dan çeker
  2. Bu image'dan container oluşturur
  3. Container'ı çalıştırır (mesaj yazar ve kapanır)

ADIM 3: Web Sunucusu Başlat
┌─────────────────────────────────────┐
│ docker run -d -p 80:80 --name web nginx │
└─────────────────────────────────────┘
→ -d : Detached mode (arka planda çalış)
→ -p 80:80 : Host'un 80 portunu container'ın 80 portuna bağla
→ --name web : Container'a "web" adını ver
→ nginx : Kullanılacak image

ADIM 4: Tarayıcıda Test Et
→ http://localhost adresine git
→ "Welcome to nginx!" yazısını görmelisin

ADIM 5: Container Yönetim Komutları
┌─────────────────────────────────────┐
│ docker ps                # Çalışanları listele │
│ docker ps -a             # Tümünü listele      │
│ docker stop web          # Durdur              │
│ docker start web         # Tekrar başlat       │
│ docker logs web          # Log'lara bak        │
│ docker rm web            # Sil (durdukt sonra) │
└─────────────────────────────────────┘

═══════════════════════════════════════
📝 ÖZET - Bugün Ne Öğrendim?
═══════════════════════════════════════
□ Docker'ın ne olduğunu ve neden kullanıldığını
□ Image ve Container farkını
□ docker run, ps, stop, rm komutlarını
□ Port mapping (-p) mantığını

✅ Başarı Kriteri: localhost'ta Nginx sayfasını gördün mü?`,
                        "resources": [
                            { "name": "Docker Docs", "url": "https://docs.docker.com/get-started/" },
                            { "name": "Docker Cheatsheet", "url": "https://dockerlabs.collabnix.com/docker/cheatsheet/" }
                        ]
                    },
                    {
                        "id": 2,
                        "date": "7-8 Şubat",
                        "title": "Dockerfile & Network",
                        "desc": "Bölüm 4-5: Image oluşturma ve Ağ yapısı.",
                        "challenge": `═══════════════════════════════════════
� TEORİ - Udemy'den İzle (Bölüm 4-5)
═══════════════════════════════════════

💡 Dockerfile Nedir?
→ Kendi image'ını oluşturmak için yazılan talimat dosyası
→ Her satır bir "layer" (katman) oluşturur
→ Layer'lar cache'lenir = hızlı build

💡 Temel Dockerfile Komutları:
┌────────────┬────────────────────────────────────┐
│ FROM       │ Temel image seç (zorunlu, ilk satır) │
│ COPY       │ Dosyaları image'a kopyala          │
│ RUN        │ Komut çalıştır (apt install gibi)  │
│ WORKDIR    │ Çalışma dizinini ayarla            │
│ EXPOSE     │ Port bilgisi (dokümantasyon)       │
│ CMD        │ Container başlayınca çalışacak     │
│ ENTRYPOINT │ Değişmez başlangıç komutu          │
└────────────┴────────────────────────────────────┘

💡 Docker Network Tipleri:
→ bridge: Varsayılan, container'lar arası iletişim
→ host: Container doğrudan host ağını kullanır
→ none: Ağ yok, izole

═══════════════════════════════════════
�️ PRATİK - Kendi Image'ını Yap!
═══════════════════════════════════════

ADIM 1: Proje Klasörü Oluştur
┌─────────────────────────────────────┐
│ mkdir docker-website                │
│ cd docker-website                   │
└─────────────────────────────────────┘

ADIM 2: HTML Dosyası Oluştur (index.html)
┌─────────────────────────────────────┐
│ <!DOCTYPE html>                     │
│ <html>                              │
│ <head>                              │
│   <title>Benim Sitem</title>        │
│ </head>                             │
│ <body>                              │
│   <h1>Merhaba Docker!</h1>          │
│   <p>Bu sayfa Docker ile çalışıyor</p> │
│ </body>                             │
│ </html>                             │
└─────────────────────────────────────┘

ADIM 3: Dockerfile Oluştur (uzantısız!)
┌─────────────────────────────────────┐
│ FROM nginx:alpine                   │
│ COPY index.html /usr/share/nginx/html/ │
└─────────────────────────────────────┘
→ nginx:alpine = küçük boyutlu nginx image'ı
→ /usr/share/nginx/html/ = nginx'in web klasörü

ADIM 4: Image'ı Build Et
┌─────────────────────────────────────┐
│ docker build -t benim-sitem:v1 .    │
└─────────────────────────────────────┘
→ -t benim-sitem:v1 = image'a isim:tag ver
→ . = Dockerfile'ın bulunduğu dizin

ADIM 5: Kendi Image'ını Çalıştır
┌─────────────────────────────────────┐
│ docker run -d -p 8080:80 benim-sitem:v1 │
└─────────────────────────────────────┘
→ http://localhost:8080 adresinde kendi sayfanı gör!

ADIM 6: Network Pratiği
┌─────────────────────────────────────┐
│ docker network ls                   │
│ docker network create benim-ag      │
│ docker run -d --network benim-ag --name web1 nginx │
│ docker run -d --network benim-ag --name web2 nginx │
│ docker exec web1 ping web2          │
└─────────────────────────────────────┘
→ Aynı network'teki container'lar isimle haberleşir!

═══════════════════════════════════════
� ÖZET - Bugün Ne Öğrendim?
═══════════════════════════════════════
□ Dockerfile yazma ve build etme
□ FROM, COPY, RUN komutlarının ne yaptığını
□ docker build -t komutu ile image oluşturma
□ Docker network oluşturma ve kullanma

✅ Başarı Kriteri: localhost:8080'de kendi HTML sayfanı gördün mü?`,
                        "resources": [
                            { "name": "Dockerfile Reference", "url": "https://docs.docker.com/engine/reference/builder/" }
                        ]
                    },
                    {
                        "id": 3,
                        "date": "9-10 Şubat",
                        "title": "Compose & Swarm",
                        "desc": "Bölüm 6: Çoklu servis yönetimi.",
                        "challenge": `═══════════════════════════════════════
� TEORİ - Udemy'den İzle (Bölüm 6)
═══════════════════════════════════════

💡 Docker Compose Nedir?
→ Birden fazla container'ı TEK DOSYA ile yönetme aracı
→ YAML formatında yazılır (docker-compose.yml)
→ "docker-compose up" = tüm servisleri başlat
→ "docker-compose down" = tüm servisleri durdur

💡 Neden Compose Kullanırız?
→ Gerçek uygulamalar tek container'da çalışmaz
→ Örnek: Web App + Database + Cache + Queue
→ Her seferinde 4 ayrı "docker run" yazmak zor
→ Compose ile tek komutla hepsini yönetirsin

💡 YAML Dosya Yapısı:
┌────────────────────────────────────┐
│ version: '3.8'     # Compose versiyonu
│ services:          # Servisler (container'lar)
│   web:             # Servis adı
│     image: nginx   # Kullanılacak image
│     ports:         # Port mapping
│   db:              # İkinci servis
│     image: mysql   
│ volumes:           # Kalıcı veri alanları
│ networks:          # Özel ağlar
└────────────────────────────────────┘

═══════════════════════════════════════
�️ PRATİK - WordPress Stack Kur!
═══════════════════════════════════════

ADIM 1: Proje Klasörü
┌─────────────────────────────────────┐
│ mkdir wordpress-stack               │
│ cd wordpress-stack                  │
└─────────────────────────────────────┘

ADIM 2: docker-compose.yml Oluştur
┌─────────────────────────────────────┐
│ version: '3.8'                      │
│                                     │
│ services:                           │
│   db:                               │
│     image: mysql:5.7                │
│     environment:                    │
│       MYSQL_ROOT_PASSWORD: root123  │
│       MYSQL_DATABASE: wordpress     │
│       MYSQL_USER: wpuser            │
│       MYSQL_PASSWORD: wppass        │
│     volumes:                        │
│       - db_data:/var/lib/mysql      │
│                                     │
│   wordpress:                        │
│     depends_on:                     │
│       - db                          │
│     image: wordpress:latest         │
│     ports:                          │
│       - "8080:80"                   │
│     environment:                    │
│       WORDPRESS_DB_HOST: db:3306    │
│       WORDPRESS_DB_USER: wpuser     │
│       WORDPRESS_DB_PASSWORD: wppass │
│       WORDPRESS_DB_NAME: wordpress  │
│                                     │
│ volumes:                            │
│   db_data:                          │
└─────────────────────────────────────┘

→ depends_on: WordPress, DB'den sonra başlar
→ db:3306: Servis adıyla erişim (network magic!)
→ volumes: Veritabanı verileri silinmez

ADIM 3: Çalıştır ve Test Et
┌─────────────────────────────────────┐
│ docker-compose up -d                │
│ docker-compose ps                   │
│ docker-compose logs wordpress       │
└─────────────────────────────────────┘
→ http://localhost:8080 adresine git
→ WordPress kurulum ekranını görmelisin!

ADIM 4: Temizlik
┌─────────────────────────────────────┐
│ docker-compose down                 │
│ docker-compose down -v  # Volume'ları da sil
└─────────────────────────────────────┘

═══════════════════════════════════════
📝 ÖZET - Bugün Ne Öğrendim?
═══════════════════════════════════════
□ Docker Compose ne işe yarar
□ YAML dosya formatını
□ services, volumes, networks kavramlarını
□ docker-compose up/down/ps/logs komutlarını

✅ Başarı Kriteri: WordPress kurulum ekranını gördün mü?`,
                        "resources": [
                            { "name": "Compose Docs", "url": "https://docs.docker.com/compose/" }
                        ]
                    },
                    {
                        "id": 4,
                        "date": "11 Şubat",
                        "title": "Docker Tekrar & Bölüm 7",
                        "desc": "Bölüm 7 (Ek Bilgiler) + Genel tekrar.",
                        "challenge": `═══════════════════════════════════════
� TEORİ - Udemy'den İzle (Bölüm 7)
═══════════════════════════════════════

💡 Bu Bölümde Neler Var?
→ Docker best practices
→ Multi-stage builds (küçük image'lar için)
→ Docker security önerileri
→ Production ipuçları

💡 Multi-Stage Build Nedir?
→ Tek Dockerfile'da birden fazla FROM kullanmak
→ Build aşaması ve runtime aşaması ayrılır
→ Final image çok küçük olur (sadece gerekli dosyalar)

💡 Docker Best Practices:
→ Her container TEK görev yapsın
→ .dockerignore kullan (node_modules gibi)
→ Root kullanıcısı yerine özel user oluştur
→ COPY vs ADD: Basit kopyalamada COPY kullan
→ Layer'ları azalt: RUN komutlarını birleştir

═══════════════════════════════════════
🛠️ PRATİK - Haftalık Tekrar!
═══════════════════════════════════════

� Mini Sınav - Komutları Ezbere Yaz:
┌─────────────────────────────────────┐
│ Çalışan container'ları listele?     │
│ → docker ps                         │
│                                     │
│ Tüm container'ları listele?         │
│ → docker ps -a                      │
│                                     │
│ Container durdur?                   │
│ → docker stop <container_id>        │
│                                     │
│ Container sil?                      │
│ → docker rm <container_id>          │
│                                     │
│ Container içine gir?                │
│ → docker exec -it <id> /bin/bash    │
│                                     │
│ Log'ları gör?                       │
│ → docker logs <container_id>        │
│                                     │
│ Image'ları listele?                 │
│ → docker images                     │
└─────────────────────────────────────┘

� Temizlik Komutları:
┌─────────────────────────────────────┐
│ docker system df        # Disk kullanımı
│ docker system prune -a  # Temizlik (DİKKAT!)
│ docker network ls       # Network'ler
│ docker volume ls        # Volume'lar
└─────────────────────────────────────┘

� Bonus - Flask App Dockerize:
1. app.py oluştur:
┌─────────────────────────────────────┐
│ from flask import Flask             │
│ app = Flask(__name__)               │
│ @app.route('/')                     │
│ def hello():                        │
│     return "Merhaba Flask!"         │
│ if __name__ == '__main__':          │
│     app.run(host='0.0.0.0',port=5000)│
└─────────────────────────────────────┘

2. Dockerfile:
┌─────────────────────────────────────┐
│ FROM python:3.9-slim                │
│ WORKDIR /app                        │
│ RUN pip install flask               │
│ COPY app.py .                       │
│ EXPOSE 5000                         │
│ CMD ["python", "app.py"]            │
└─────────────────────────────────────┘

3. Build ve çalıştır:
┌─────────────────────────────────────┐
│ docker build -t flask-app .         │
│ docker run -d -p 5000:5000 flask-app│
└─────────────────────────────────────┘
→ http://localhost:5000 kontrol et!

═══════════════════════════════════════
📝 ÖZET - Docker Haftası Tamamlandı!
═══════════════════════════════════════
□ Container vs VM farkını biliyorum
□ docker run/ps/stop/rm komutlarını biliyorum
□ Dockerfile yazabiliyorum
□ docker-compose ile multi-container yönetebiliyorum
□ Network ve Volume kavramlarını anladım

✅ Başarı Kriteri: Flask app localhost:5000'de çalışıyor mu?`,
                        "resources": [
                            { "name": "Docker Best Practices", "url": "https://docs.docker.com/develop/develop-images/dockerfile_best-practices/" }
                        ]
                    }
                ]
            },
            {
                "week": "2. Hafta: Terraform & AWS Temelleri",
                "tasks": [
                    {
                        "id": 5,
                        "date": "12-13 Şubat",
                        "title": "Terraform & AWS Kurulum",
                        "desc": "Bölüm 1-4: Giriş, Kurulum ve Hazırlık.",
                        "challenge": `═══════════════════════════════════════
� TEORİ - Udemy'den İzle (Bölüm 1-4)
═══════════════════════════════════════

💡 Terraform Nedir?
→ HashiCorp'un Infrastructure as Code (IaC) aracı
→ Altyapıyı KOD olarak tanımlarsın
→ terraform apply = altyapı otomatik oluşur
→ terraform destroy = altyapı silinir

💡 Neden Terraform?
→ Manuel işlem = hata riski, unutulan adımlar
→ Terraform = tekrarlanabilir, versiyon kontrollü
→ Aynı kodu farklı ortamlarda (dev/prod) kullanabilirsin
→ Değişiklikleri plan aşamasında görürsün

💡 Temel Kavramlar:
┌────────────────────────────────────┐
│ Provider  = Hangi bulut? (AWS, Azure)
│ Resource  = Ne oluşturuyoruz? (EC2, S3)
│ State     = Mevcut durum kaydı
│ Plan      = Ne değişecek önizlemesi
│ Apply     = Değişiklikleri uygula
│ Destroy   = Her şeyi sil
└────────────────────────────────────┘

💡 HCL (HashiCorp Configuration Language):
→ Terraform'un kendi dili
→ .tf uzantılı dosyalar
→ JSON benzeri ama daha okunabilir

═══════════════════════════════════════
�️ PRATİK - Kurulumları Yap!
═══════════════════════════════════════

ADIM 1: Terraform Kurulumu
┌─────────────────────────────────────┐
│ # Windows (PowerShell - Admin)      │
│ winget install HashiCorp.Terraform  │
│                                     │
│ # Veya manuel:                      │
│ # terraform.io/downloads            │
│ # İndir → Zip aç → PATH'e ekle      │
└─────────────────────────────────────┘

Kontrol:
┌─────────────────────────────────────┐
│ terraform --version                 │
└─────────────────────────────────────┘
→ "Terraform v1.x.x" görmeli

ADIM 2: AWS CLI Kurulumu
┌─────────────────────────────────────┐
│ # Windows                           │
│ winget install Amazon.AWSCLI        │
│                                     │
│ # Veya: aws.amazon.com/cli          │
└─────────────────────────────────────┘

Kontrol:
┌─────────────────────────────────────┐
│ aws --version                       │
└─────────────────────────────────────┘

ADIM 3: AWS Hesabı Oluştur (Free Tier)
→ aws.amazon.com > Create Account
→ Kredi kartı gerekli (free tier aşılmazsa ücret yok)
→ 12 ay boyunca çoğu servis ücretsiz

ADIM 4: IAM User Oluştur
AWS Console > IAM > Users > Add User
┌─────────────────────────────────────┐
│ User name: terraform-user           │
│ Access type: Programmatic access ✓  │
│ Permissions: AdministratorAccess    │
│                                     │
│ → Access Key ID'yi kaydet!          │
│ → Secret Access Key'i kaydet!       │
│ (Bu şifreler bir daha gösterilmez!) │
└─────────────────────────────────────┘

ADIM 5: AWS CLI Konfigürasyonu
┌─────────────────────────────────────┐
│ aws configure                       │
└─────────────────────────────────────┘
→ Access Key ID: (yapıştır)
→ Secret Access Key: (yapıştır)
→ Default region: eu-west-1
→ Default output format: json

ADIM 6: Test Et
┌─────────────────────────────────────┐
│ aws sts get-caller-identity         │
└─────────────────────────────────────┘
→ Hesap ID ve kullanıcı adını görmeli

═══════════════════════════════════════
📝 ÖZET - Bugün Ne Öğrendim?
═══════════════════════════════════════
□ Terraform nedir ve neden kullanılır
□ IaC (Infrastructure as Code) kavramı
□ Terraform ve AWS CLI kurulumu
□ AWS IAM user oluşturma
□ aws configure ile credential ayarlama

✅ Başarı Kriteri: aws sts get-caller-identity çalışıyor mu?`,
                        "resources": [
                            { "name": "Terraform Install", "url": "https://developer.hashicorp.com/terraform/downloads" },
                            { "name": "AWS CLI", "url": "https://aws.amazon.com/cli/" }
                        ]
                    },
                    {
                        "id": 6,
                        "date": "14-15 Şubat",
                        "title": "Terraform Temelleri",
                        "desc": "Bölüm 5: State mantığı ve temel komutlar.",
                        "challenge": `═══════════════════════════════════════
� TEORİ - Udemy'den İzle (Bölüm 5)
═══════════════════════════════════════

💡 Terraform Workflow:
┌─────────────────────────────────────┐
│ 1. WRITE    → .tf dosyaları yaz     │
│ 2. INIT     → Provider'ları indir   │
│ 3. PLAN     → Değişiklikleri önizle │
│ 4. APPLY    → Uygula                │
│ 5. DESTROY  → Her şeyi sil          │
└─────────────────────────────────────┘

💡 State Dosyası Nedir?
→ terraform.tfstate = Terraform'un "hafızası"
→ Oluşturulan kaynakların kaydını tutar
→ Plan yaparken: state vs kod karşılaştırılır
→ ASLA ELLE DÜZENLENMEMELİ!

💡 Terraform Blok Yapısı:
┌─────────────────────────────────────┐
│ terraform { }   # Terraform ayarları
│ provider { }    # Bulut sağlayıcı   
│ resource { }    # Oluşturulacak kaynak
│ data { }        # Var olan kaynağı oku
│ variable { }    # Değişken tanımla  
│ output { }      # Çıktı göster      
└─────────────────────────────────────┘

� Resource Sözdizimi:
resource "TİP" "İSİM" {
  özellik = "değer"
}
→ TİP: aws_instance, aws_s3_bucket vb.
→ İSİM: Kodda referans için kullanılır

═══════════════════════════════════════
🛠️ PRATİK - İlk Terraform Kodunu Yaz!
═══════════════════════════════════════

ADIM 1: Proje Klasörü
┌─────────────────────────────────────┐
│ mkdir terraform-lab                 │
│ cd terraform-lab                    │
└─────────────────────────────────────┘

ADIM 2: main.tf Oluştur (AWS olmadan test!)
┌─────────────────────────────────────┐
│ terraform {                         │
│   required_providers {              │
│     local = {                       │
│       source = "hashicorp/local"    │
│     }                               │
│   }                                 │
│ }                                   │
│                                     │
│ resource "local_file" "merhaba" {   │
│   content  = "Merhaba Terraform!"   │
│   filename = "output/merhaba.txt"   │
│ }                                   │
│                                     │
│ output "dosya_yolu" {               │
│   value = local_file.merhaba.filename│
│ }                                   │
└─────────────────────────────────────┘
→ local provider = AWS'e gerek kalmadan test

ADIM 3: Terraform Init
┌─────────────────────────────────────┐
│ terraform init                      │
└─────────────────────────────────────┘
→ Provider'ları indirir (.terraform klasörü oluşur)
→ "Terraform has been successfully initialized" görmeli

ADIM 4: Terraform Plan
┌─────────────────────────────────────┐
│ terraform plan                      │
└─────────────────────────────────────┘
→ Ne yapılacağını gösterir:
  + = eklenecek (yeşil)
  - = silinecek (kırmızı)
  ~ = değişecek (sarı)

ADIM 5: Terraform Apply
┌─────────────────────────────────────┐
│ terraform apply                     │
│ # "yes" yaz ve Enter                │
└─────────────────────────────────────┘
→ output/merhaba.txt dosyası oluşur!
→ terraform.tfstate dosyası oluşur

ADIM 6: State'i İncele
┌─────────────────────────────────────┐
│ terraform show                      │
│ terraform state list                │
└─────────────────────────────────────┘

ADIM 7: Temizlik
┌─────────────────────────────────────┐
│ terraform destroy                   │
│ # "yes" yaz                         │
└─────────────────────────────────────┘
→ Oluşturulan dosya silinir

═══════════════════════════════════════
📝 ÖZET - Bugün Ne Öğrendim?
═══════════════════════════════════════
□ terraform init/plan/apply/destroy akışını
□ State dosyasının önemini
□ resource ve output bloklarını
□ Local provider ile test yapmayı

✅ Başarı Kriteri: merhaba.txt oluştu ve silindi mi?`,
                        "resources": [
                            { "name": "Terraform Basics", "url": "https://developer.hashicorp.com/terraform/tutorials/aws-get-started" }
                        ]
                    },
                    {
                        "id": 7,
                        "date": "16-17 Şubat",
                        "title": "AWS Temelleri (Manuel)",
                        "desc": "Bölüm 6: AWS Console ile temel servisler.",
                        "challenge": `═══════════════════════════════════════
� TEORİ - Udemy'den İzle (Bölüm 6)
═══════════════════════════════════════

💡 AWS Temel Servisleri:
┌───────────────────────────────────────┐
│ EC2      = Sanal sunucu              │
│ S3       = Dosya/nesne depolama      │
│ VPC      = Özel ağ                   │
│ IAM      = Kullanıcı/yetki yönetimi  │
│ RDS      = Yönetilen veritabanı      │
│ Lambda   = Sunucusuz fonksiyon       │
└───────────────────────────────────────┘

💡 EC2 Nedir?
→ Elastic Compute Cloud = Sanal sunucu
→ AMI: Önceden yapılandırılmış sunucu image'ı
→ Instance Type: Sunucu gücü (t2.micro free tier!)
→ Security Group: Firewall kuralları
→ Key Pair: SSH erişimi için şifre

💡 VPC Temel Kavramlar:
→ VPC = Virtual Private Cloud (Kendi ağın)
→ Subnet = Alt ağ (public veya private)
→ Internet Gateway = VPC'ye internet bağlantısı
→ Security Group = Hangi portlar açık?

💡 Free Tier Uyarıları:
⚠️ t2.micro = Aylık 750 saat ücretsiz
⚠️ Terminate etmeyi unutma yoksa ücret kesilir!
⚠️ EBS (disk) de ücretli olabilir

═══════════════════════════════════════
�️ PRATİK - Manuel EC2 Oluştur!
═══════════════════════════════════════

ADIM 1: AWS Console'a Gir
→ console.aws.amazon.com
→ EC2 servisini ara ve aç

ADIM 2: Launch Instance
┌─────────────────────────────────────┐
│ Name: manuel-test-server            │
│ AMI: Amazon Linux 2023 (Free tier)  │
│ Instance Type: t2.micro             │
│ Key Pair: "Create new key pair"     │
│   → Name: devops-key                │
│   → Type: RSA                       │
│   → Format: .pem (indir ve sakla!)  │
└─────────────────────────────────────┘

ADIM 3: Network Ayarları
┌─────────────────────────────────────┐
│ VPC: Default VPC                    │
│ Auto-assign public IP: Enable      │
│ Security Group: Create new          │
│   → SSH (22): My IP                 │
│   → HTTP (80): Anywhere             │
└─────────────────────────────────────┘

ADIM 4: Launch Et
→ "Launch instance" tıkla
→ Instances listesinde bekle (pending → running)

ADIM 5: SSH ile Bağlan
┌─────────────────────────────────────┐
│ # Key dosyasının olduğu klasöre git │
│ cd Downloads                        │
│                                     │
│ # SSH bağlantısı                    │
│ ssh -i "devops-key.pem" ec2-user@<PUBLIC-IP>
│                                     │
│ # İlk bağlantıda "yes" yaz          │
└─────────────────────────────────────┘
→ <PUBLIC-IP> = EC2 Details'den al

ADIM 6: Sunucu İçinde Web Server Kur
┌─────────────────────────────────────┐
│ sudo yum update -y                  │
│ sudo yum install httpd -y           │
│ sudo systemctl start httpd          │
│ sudo systemctl enable httpd         │
│ echo "<h1>Merhaba AWS!</h1>" | sudo tee /var/www/html/index.html
└─────────────────────────────────────┘

ADIM 7: Tarayıcıda Test
→ http://<PUBLIC-IP> adresine git
→ "Merhaba AWS!" yazısını görmelisin!

ADIM 8: TEMİZLİK (ÇOK ÖNEMLİ!)
┌─────────────────────────────────────┐
│ EC2 > Instances > Select instance   │
│ Instance state > Terminate          │
│ ⚠️ Silmezsen para ödersin!          │
└─────────────────────────────────────┘

═══════════════════════════════════════
📝 ÖZET - Bugün Ne Öğrendim?
═══════════════════════════════════════
□ AWS Console navigasyonunu
□ EC2 launch workflow'unu
□ Key Pair oluşturma ve SSH bağlantısı
□ Security Group mantığını
□ Terminate etmenin önemini (💰)

✅ Başarı Kriteri: Kendi sunucuna bağlanıp web sayfası gördün mü?`,
                        "resources": [
                            { "name": "EC2 Guide", "url": "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html" }
                        ]
                    },
                    {
                        "id": 8,
                        "date": "18 Şubat",
                        "title": "2.Hafta Tekrar & VPC",
                        "desc": "Terraform + AWS Tekrar günü.",
                        "challenge": `═══════════════════════════════════════
� TEORİ - Bu Hafta Öğrendiklerini Tekrarla
═══════════════════════════════════════

💡 Terraform Workflow Özeti:
┌─────────────────────────────────────┐
│ terraform init    # Provider indir  │
│ terraform plan    # Önizleme        │
│ terraform apply   # Uygula          │
│ terraform destroy # Temizle         │
└─────────────────────────────────────┘

💡 AWS Temel Servisleri:
┌─────────────────────────────────────┐
│ EC2  = Sanal sunucu                │
│ S3   = Dosya depolama              │
│ VPC  = Özel ağ                     │
│ IAM  = Kullanıcı yönetimi          │
└─────────────────────────────────────┘

💡 VPC Mimarisi:
┌───────────────────────────────────────────┐
│                    VPC                    │
│  ┌────────────┐      ┌────────────┐      │
│  │  PUBLIC    │      │  PRIVATE   │      │
│  │  SUBNET    │      │  SUBNET    │      │
│  │  (Web)     │      │  (DB)      │      │
│  └─────┬──────┘      └──────┬─────┘      │
│        │                    │            │
│        ▼                    ▼            │
│   Internet GW          NAT Gateway       │
└───────────────────────────────────────────┘

💡 CIDR Bloğu Nedir?
→ IP adresi aralığını tanımlar
→ /16 = 65,536 IP (10.0.0.0/16)
→ /24 = 256 IP (10.0.1.0/24)
→ Büyük sayı = daha az IP

═══════════════════════════════════════
🛠️ PRATİK - VPC Mimarisi Çiz!
═══════════════════════════════════════

📝 Kağıda/Excalidraw'a Çiz:

VPC: my-devops-vpc (10.0.0.0/16)
├── Region: eu-west-1
├── Public Subnet (10.0.1.0/24) - AZ: eu-west-1a
│   └── Web Server (EC2)
├── Public Subnet (10.0.2.0/24) - AZ: eu-west-1b
│   └── Web Server (EC2)
├── Private Subnet (10.0.101.0/24) - AZ: eu-west-1a
│   └── Database (RDS)
├── Private Subnet (10.0.102.0/24) - AZ: eu-west-1b
│   └── Database (RDS)
├── Internet Gateway
├── NAT Gateway (public subnet'te)
├── Route Table - Public
│   └── 0.0.0.0/0 → Internet Gateway
└── Route Table - Private
    └── 0.0.0.0/0 → NAT Gateway

� Mini Sınav - Ezbere Yaz:
┌─────────────────────────────────────┐
│ 1. Terraform init ne yapar?         │
│ 2. terraform.tfstate nedir?         │
│ 3. Security Group ne işe yarar?     │
│ 4. Free tier EC2 instance type?     │
│ 5. Public vs Private subnet farkı?  │
└─────────────────────────────────────┘

CEVAPLAR:
1. Provider'ları indirir
2. Terraform'un state dosyası - oluşturulan kaynaklar
3. EC2 için firewall kuralları
4. t2.micro
5. Public = internet erişimi var, Private = yok

� AWS Console'da VPC İncele:
→ VPC > Your VPCs > Default VPC seç
→ Subnets tab'ına bak
→ Route Tables tab'ına bak
→ Internet Gateways tab'ına bak

═══════════════════════════════════════
📝 ÖZET - 2. Hafta Tamamlandı!
═══════════════════════════════════════
□ Terraform workflow'u biliyorum
□ AWS hesabı ve CLI kurulumu yaptım
□ Manuel EC2 oluşturup SSH ile bağlandım
□ VPC/Subnet/Security Group kavramlarını anladım
□ CIDR bloklarını hesaplayabiliyorum

✅ Başarı Kriteri: VPC mimarisini kağıda çizebildin mi?`,
                        "resources": [
                            { "name": "VPC Docs", "url": "https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html" }
                        ]
                    }
                ]
            },
            {
                "week": "3. Hafta: Otomasyon & Final",
                "tasks": [
                    {
                        "id": 9,
                        "date": "19-20 Şubat",
                        "title": "Terraform ile AWS",
                        "desc": "Bölüm 7: Terraform ile AWS Kaynakları.",
                        "challenge": `═══════════════════════════════════════
� TEORİ - Udemy'den İzle (Bölüm 7)
═══════════════════════════════════════

💡 AWS Provider Konfigürasyonu:
┌─────────────────────────────────────┐
│ provider "aws" {                    │
│   region = "eu-west-1"              │
│ }                                   │
└─────────────────────────────────────┘
→ Credential'lar aws configure'dan okunur
→ Region her provider bloğunda belirtilmeli

💡 Data Source Nedir?
→ VAR OLAN kaynakları okur
→ Yeni kaynak oluşturmaz
→ Örnek: En güncel AMI ID'sini bul
┌─────────────────────────────────────┐
│ data "aws_ami" "latest" {           │
│   most_recent = true                │
│   owners      = ["amazon"]          │
│ }                                   │
└─────────────────────────────────────┘

💡 Temel AWS Kaynakları:
→ aws_instance = EC2 sunucu
→ aws_s3_bucket = S3 bucket
→ aws_security_group = Firewall
→ aws_vpc = Virtual Private Cloud
→ aws_subnet = Alt ağ

💡 Resource Referansları:
→ Bir kaynak diğerine referans verebilir
→ Syntax: <resource_type>.<name>.<attribute>
→ Örnek: aws_s3_bucket.my_bucket.arn

═══════════════════════════════════════
�️ PRATİK - S3 Bucket Oluştur!
═══════════════════════════════════════

ADIM 1: Proje Klasörü
┌─────────────────────────────────────┐
│ mkdir terraform-s3                  │
│ cd terraform-s3                     │
└─────────────────────────────────────┘

ADIM 2: main.tf Oluştur
┌─────────────────────────────────────┐
│ terraform {                         │
│   required_providers {              │
│     aws = {                         │
│       source  = "hashicorp/aws"     │
│       version = "~> 5.0"            │
│     }                               │
│   }                                 │
│ }                                   │
│                                     │
│ provider "aws" {                    │
│   region = "eu-west-1"              │
│ }                                   │
│                                     │
│ # S3 Bucket oluştur                 │
│ resource "aws_s3_bucket" "devops" { │
│   bucket = "devops-kamp-ADINIZ-2026"│
│   # ⚠️ Bucket ismi GLOBAL benzersiz!│
│                                     │
│   tags = {                          │
│     Name        = "DevOps Kamp"     │
│     Environment = "Learning"        │
│   }                                 │
│ }                                   │
│                                     │
│ # Versioning aç                     │
│ resource "aws_s3_bucket_versioning" "v" {
│   bucket = aws_s3_bucket.devops.id  │
│   versioning_configuration {        │
│     status = "Enabled"              │
│   }                                 │
│ }                                   │
│                                     │
│ output "bucket_arn" {               │
│   value = aws_s3_bucket.devops.arn  │
│ }                                   │
│                                     │
│ output "bucket_url" {               │
│   value = "https://\${aws_s3_bucket.devops.bucket}.s3.amazonaws.com"
│ }                                   │
└─────────────────────────────────────┘

ADIM 3: Uygula
┌─────────────────────────────────────┐
│ terraform init                      │
│ terraform plan                      │
│ terraform apply                     │
│ # "yes" yaz                         │
└─────────────────────────────────────┘

ADIM 4: AWS Console'da Kontrol Et
→ AWS Console > S3 > Buckets
→ Bucket'ını listede gör!

ADIM 5: TEMİZLİK (ÖNEMLİ!)
┌─────────────────────────────────────┐
│ terraform destroy                   │
│ # "yes" yaz                         │
└─────────────────────────────────────┘
→ S3 free tier'da da ücret kesebilir!

═══════════════════════════════════════
📝 ÖZET - Bugün Ne Öğrendim?
═══════════════════════════════════════
□ AWS provider konfigürasyonunu
□ aws_s3_bucket resource'unu
□ Resource referanslarını (aws_s3_bucket.name.attribute)
□ Output kullanımını
□ Gerçek AWS kaynağı oluşturma/silme

✅ Başarı Kriteri: S3 bucket AWS Console'da göründü mü?`,
                        "resources": [
                            { "name": "S3 Terraform", "url": "https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket" }
                        ]
                    },
                    {
                        "id": 10,
                        "date": "21-22 Şubat",
                        "title": "Terraform ile EC2",
                        "desc": "Bölüm 7: EC2 Sunucu Otomasyonu.",
                        "challenge": `═══════════════════════════════════════
� TEORİ - Udemy'den İzle (Bölüm 7 devam)
═══════════════════════════════════════

💡 aws_instance Resource:
→ EC2 sunucusu oluşturur
→ AMI ID gerekli (data source ile bulunur)
→ Instance type gerekli (t2.micro free tier)
→ Security group bağlanabilir

💡 Variables (Değişkenler):
┌─────────────────────────────────────┐
│ variable "instance_type" {          │
│   description = "EC2 tipi"          │
│   type        = string              │
│   default     = "t2.micro"          │
│ }                                   │
└─────────────────────────────────────┘
→ Kullanım: var.instance_type
→ -var="instance_type=t3.micro" ile override

💡 Data Source ile AMI Bulma:
→ AMI ID'leri region'a göre değişir
→ Data source ile en güncel AMI'yi bul
→ Hardcode AMI ID'si kullanma!

💡 Security Group Tanımlama:
→ ingress = gelen trafik kuralları
→ egress = giden trafik kuralları
→ 0.0.0.0/0 = tüm IP'lere izin ver

═══════════════════════════════════════
�️ PRATİK - EC2 Sunucu Oluştur!
═══════════════════════════════════════

ADIM 1: Proje Klasörü
┌─────────────────────────────────────┐
│ mkdir terraform-ec2                 │
│ cd terraform-ec2                    │
└─────────────────────────────────────┘

ADIM 2: variables.tf Oluştur
┌─────────────────────────────────────┐
│ variable "instance_type" {          │
│   default = "t2.micro"              │
│ }                                   │
│                                     │
│ variable "project_name" {           │
│   default = "DevOps-Kamp"           │
│ }                                   │
└─────────────────────────────────────┘

ADIM 3: main.tf Oluştur
┌─────────────────────────────────────┐
│ terraform {                         │
│   required_providers {              │
│     aws = {                         │
│       source  = "hashicorp/aws"     │
│       version = "~> 5.0"            │
│     }                               │
│   }                                 │
│ }                                   │
│                                     │
│ provider "aws" { region = "eu-west-1" }
│                                     │
│ # En güncel Amazon Linux AMI'yi bul │
│ data "aws_ami" "amazon_linux" {     │
│   most_recent = true                │
│   owners      = ["amazon"]          │
│   filter {                          │
│     name   = "name"                 │
│     values = ["al2023-ami-*-x86_64"]│
│   }                                 │
│ }                                   │
│                                     │
│ # Security Group oluştur            │
│ resource "aws_security_group" "web" {│
│   name = "web-server-sg"            │
│                                     │
│   ingress {                         │
│     from_port = 22; to_port = 22    │
│     protocol = "tcp"                │
│     cidr_blocks = ["0.0.0.0/0"]     │
│   }                                 │
│   ingress {                         │
│     from_port = 80; to_port = 80    │
│     protocol = "tcp"                │
│     cidr_blocks = ["0.0.0.0/0"]     │
│   }                                 │
│   egress {                          │
│     from_port = 0; to_port = 0      │
│     protocol = "-1"                 │
│     cidr_blocks = ["0.0.0.0/0"]     │
│   }                                 │
│ }                                   │
│                                     │
│ # EC2 Instance oluştur              │
│ resource "aws_instance" "web" {     │
│   ami = data.aws_ami.amazon_linux.id│
│   instance_type = var.instance_type │
│   vpc_security_group_ids = [        │
│     aws_security_group.web.id       │
│   ]                                 │
│   tags = { Name = "Web-Server" }    │
│ }                                   │
│                                     │
│ output "public_ip" {                │
│   value = aws_instance.web.public_ip│
│ }                                   │
└─────────────────────────────────────┘

ADIM 4: Uygula ve Test Et
┌─────────────────────────────────────┐
│ terraform init                      │
│ terraform plan                      │
│ terraform apply                     │
│ # Output'taki IP'yi not al          │
└─────────────────────────────────────┘

ADIM 5: AWS Console'dan Kontrol Et
→ EC2 > Instances > DevOps - Kamp - Web

ADIM 6: TEMİZLİK(ÖNEMLİ!)
┌─────────────────────────────────────┐
│ terraform destroy                   │
│ # "yes" yaz                         │
└─────────────────────────────────────┘

═══════════════════════════════════════
📝 ÖZET - Bugün Ne Öğrendim ?
═══════════════════════════════════════
□ aws_instance resource kullanımı
□ data source ile AMI bulma
□ aws_security_group tanımlama
□ variables.tf ile değişken kullanımı
□ Resource referansları(security_group.id)

✅ Başarı Kriteri: EC2 public IP output'ta göründü mü?`,
                        "resources": [
                            { "name": "EC2 Terraform", "url": "https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/instance" }
                        ]
                    },
                    {
                        "id": 11,
                        "date": "23-24 Şubat",
                        "title": "Terraform İleri Konular",
                        "desc": "Bölüm 8: Modüller ve İleri Konular.",
                        "challenge": `═══════════════════════════════════════
📺 TEORİ - Udemy'den İzle (Bölüm 8)
═══════════════════════════════════════

💡 Terraform Modülü Nedir?
→ Tekrar kullanılabilir Terraform kodu
→ Kendi "building block"larını oluşturursun
→ Aynı modülü farklı parametrelerle kullanabilirsin
→ DRY (Don't Repeat Yourself) prensibi

💡 Modül Yapısı:
terraform-project/
├── main.tf          # Root module
├── variables.tf     # Root değişkenler
├── outputs.tf       # Root çıktılar
└── modules/
    └── ec2/         # Child module
        ├── main.tf
        ├── variables.tf
        └── outputs.tf

💡 Modül Çağırma:
module "isim" {
  source = "./modules/ec2"   # Modül yolu
  param1 = "deger1"          # Input değişkeni
  param2 = var.baska_degisken
}

💡 Modül Output Kullanımı:
→ module.isim.output_adi şeklinde erişilir
→ Örnek: module.web.public_ip

═══════════════════════════════════════
🛠️ PRATİK - Modül Oluştur!
═══════════════════════════════════════

ADIM 1: Klasör Yapısını Oluştur
terraform-modules/
├── main.tf
├── variables.tf
└── modules/
    └── ec2-instance/
        ├── main.tf
        ├── variables.tf
        └── outputs.tf

ADIM 2: modules/ec2-instance/variables.tf
variable "instance_name" {
  type = string
}
variable "instance_type" {
  default = "t2.micro"
}

ADIM 3: modules/ec2-instance/main.tf
data "aws_ami" "al" {
  most_recent = true
  owners = ["amazon"]
  filter {
    name = "name"
    values = ["al2023-ami-*-x86_64"]
  }
}
resource "aws_instance" "this" {
  ami = data.aws_ami.al.id
  instance_type = var.instance_type
  tags = { Name = var.instance_name }
}

ADIM 4: modules/ec2-instance/outputs.tf
output "public_ip" {
  value = aws_instance.this.public_ip
}

ADIM 5: Root main.tf
provider "aws" { region = "eu-west-1" }

module "web" {
  source = "./modules/ec2-instance"
  instance_name = "Web-Server"
}
module "app" {
  source = "./modules/ec2-instance"
  instance_name = "App-Server"
}

output "web_ip" { value = module.web.public_ip }
output "app_ip" { value = module.app.public_ip }

ADIM 6: Çalıştır
terraform init
terraform apply

═══════════════════════════════════════
📝 ÖZET - Bugün Ne Öğrendim?
═══════════════════════════════════════
□ Terraform modül kavramını
□ source ile modül çağırma
□ Modül input/output kullanımı
□ DRY prensibiyle kod tekrarını azaltma

✅ Başarı Kriteri: 2 EC2 tek modülden oluştu mu?`,
                        "resources": [
                            { "name": "Terraform Modules", "url": "https://developer.hashicorp.com/terraform/language/modules" }
                        ]
                    },
                    {
                        "id": 12,
                        "date": "25 Şubat",
                        "title": "FİNAL PROJESİ 🎉",
                        "desc": "Terraform + Docker Entegrasyonu.",
                        "challenge": `═══════════════════════════════════════
🏆 FİNAL PROJESİ: Full Stack DevOps!
═══════════════════════════════════════

🎯 Hedef: Tek komutla AWS'de web sitesi yayınla!

Terraform ile:
✓ EC2 sunucu oluştur
✓ Otomatik Docker kur (UserData)
✓ Nginx container başlat
✓ Security Group ayarla
✓ URL'i output olarak göster

═══════════════════════════════════════
💡 UserData Nedir?
═══════════════════════════════════════
→ EC2 başlarken çalışan script
→ Sunucu kurulumu otomatikleşir
→ Bash script olarak yazılır
→ Cloud-init ile çalışır

═══════════════════════════════════════
🛠️ PRATİK - Final Projesini Yap!
═══════════════════════════════════════

ADIM 1: Klasör oluştur
mkdir final-project && cd final-project

ADIM 2: main.tf oluştur

provider "aws" { region = "eu-west-1" }

data "aws_ami" "al" {
  most_recent = true
  owners = ["amazon"]
  filter {
    name = "name"
    values = ["al2023-ami-*-x86_64"]
  }
}

resource "aws_security_group" "web" {
  name = "final-web-sg"
  ingress {
    from_port = 80
    to_port = 80
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port = 22
    to_port = 22
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "web" {
  ami = data.aws_ami.al.id
  instance_type = "t2.micro"
  vpc_security_group_ids = [aws_security_group.web.id]

  user_data = <<-EOF
    #!/bin/bash
    yum update -y
    yum install docker -y
    systemctl start docker
    systemctl enable docker
    docker run -d -p 80:80 nginx
  EOF

  tags = { Name = "Final-DevOps-Server" }
}

output "website_url" {
  value = "http://\${aws_instance.web.public_ip}"
}

ADIM 3: Çalıştır ve Test Et
terraform init
terraform plan
terraform apply
# 2-3 dakika bekle (Docker kurulumu)
# Output URL'ini tarayıcıda aç
# "Welcome to nginx!" görmelisin!

ADIM 4: TEMİZLİK
terraform destroy

═══════════════════════════════════════
🎉 TEBRİKLER! Kampı Tamamladın!
═══════════════════════════════════════

3 Haftada Öğrendiklerin:
✓ Docker container yönetimi
✓ Dockerfile ile image oluşturma
✓ Docker Compose ile multi-container
✓ AWS Console ve CLI
✓ Terraform ile Infrastructure as Code
✓ EC2, S3, VPC, Security Group
✓ Modüler Terraform kodu
✓ Full DevOps pipeline

Sonraki Adımlar:
→ CI/CD (GitHub Actions, GitLab CI)
→ Kubernetes
→ Monitoring (Prometheus, Grafana)
→ AWS Sertifikasyonları

✅ Başarı Kriteri: terraform apply ile site açıldı mı?`,
                        "resources": [
                            { "name": "User Data", "url": "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html" },
                            { "name": "DevOps Roadmap", "url": "https://roadmap.sh/devops" }
                        ]
                    }
                ]
            }
        ];

        // LocalStorage Keys
        const STORAGE_KEY = 'devops-camp-progress';
        const STREAK_KEY = 'devops-camp-streak';
        const LAST_VISIT_KEY = 'devops-camp-last-visit';

        // Load/Save functions
        function loadProgress() {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        }

        function saveProgress(completedIds) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(completedIds));
        }

        // Streak management
        function updateStreak() {
            const today = new Date().toDateString();
            const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
            let streak = parseInt(localStorage.getItem(STREAK_KEY) || '0');

            if (lastVisit !== today) {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);

                if (lastVisit === yesterday.toDateString()) {
                    streak++;
                } else if (lastVisit !== today) {
                    streak = 1;
                }

                localStorage.setItem(STREAK_KEY, streak.toString());
                localStorage.setItem(LAST_VISIT_KEY, today);
            }

            if (streak > 0) {
                document.getElementById('streakSection').style.display = 'flex';
                document.getElementById('streakText').textContent = `🔥 ${streak} Gün Seri!`;
            }
        }

        // Countdown
        function updateCountdown() {
            const endDate = new Date('2026-02-25T23:59:59');
            const now = new Date();
            const diff = endDate - now;

            if (diff > 0) {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

                document.getElementById('daysLeft').textContent = days;
                document.getElementById('hoursLeft').textContent = hours;
                document.getElementById('minutesLeft').textContent = minutes;
            } else {
                document.getElementById('countdown').innerHTML = '<div class="countdown-item"><div class="countdown-value">🏁</div><div class="countdown-label">Kamp Bitti!</div></div>';
            }
        }

        // Random tip
        function showRandomTip() {
            const tipElement = document.getElementById('tipText');
            tipElement.style.opacity = '0';
            setTimeout(() => {
                const randomTip = devopsTips[Math.floor(Math.random() * devopsTips.length)];
                tipElement.textContent = randomTip;
                tipElement.style.opacity = '1';
            }, 200);
        }

        // Get total task count
        function getTotalTasks() {
            return courseData.reduce((total, week) => total + week.tasks.length, 0);
        }

        // Update progress bar and stats
        function updateProgress(completedIds) {
            const total = getTotalTasks();
            const completed = completedIds.length;
            const remaining = total - completed;
            const percentage = Math.round((completed / total) * 100);

            document.getElementById('progressBar').style.width = `${percentage}%`;
            document.getElementById('progressPercentage').textContent = `${percentage}%`;
            document.getElementById('completedCount').textContent = completed;
            document.getElementById('remainingCount').textContent = remaining;
            document.getElementById('totalCount').textContent = total;

            // Update week badges
            updateWeekBadges(completedIds);

            // Check for celebrations
            if (completed === total && completed > 0) {
                showCelebration('Kampı Tamamladın! 🎓', 'Tüm görevleri bitirdin. Artık bir DevOps yolculuğuna hazırsın!');
                createConfetti();
            }
        }

        // Update week badges
        function updateWeekBadges(completedIds) {
            courseData.forEach((week, index) => {
                const weekTaskIds = week.tasks.map(t => t.id);
                const completedInWeek = weekTaskIds.filter(id => completedIds.includes(id)).length;
                const badge = document.querySelector(`.week-badge[data-week="${index + 1}"]`);

                if (completedInWeek === weekTaskIds.length) {
                    badge.classList.add('completed');
                    badge.classList.remove('in-progress');
                } else if (completedInWeek > 0) {
                    badge.classList.add('in-progress');
                    badge.classList.remove('completed');
                } else {
                    badge.classList.remove('completed', 'in-progress');
                }
            });
        }

        // Format challenge text with code highlighting
        function formatChallenge(text) {
            return text.replace(/'([^']+)'/g, '<code>$1</code>');
        }

        // Toggle task completion
        function toggleTask(taskId, completedIds) {
            const index = completedIds.indexOf(taskId);
            const wasCompleted = index > -1;

            if (wasCompleted) {
                completedIds.splice(index, 1);
            } else {
                completedIds.push(taskId);
            }

            saveProgress(completedIds);
            updateProgress(completedIds);

            const card = document.querySelector(`[data-task-id="${taskId}"]`);
            const checkbox = card.querySelector('.checkbox-input');

            if (completedIds.includes(taskId)) {
                card.classList.add('completed');
                checkbox.checked = true;

                // Check if week is completed
                checkWeekCompletion(taskId, completedIds);
            } else {
                card.classList.remove('completed');
                checkbox.checked = false;
            }
        }

        // Check week completion for celebration
        function checkWeekCompletion(taskId, completedIds) {
            courseData.forEach((week, index) => {
                const weekTaskIds = week.tasks.map(t => t.id);
                if (weekTaskIds.includes(taskId)) {
                    const allCompleted = weekTaskIds.every(id => completedIds.includes(id));
                    if (allCompleted) {
                        const weekNum = index + 1;
                        showCelebration(`${weekNum}. Hafta Tamamlandı! 🏆`, `${week.week.split(':')[1].trim()} konusunu bitirdin!`);
                        createConfetti();
                    }
                }
            });
        }

        // Celebration
        function showCelebration(title, text) {
            document.getElementById('celebrationText').textContent = text;
            document.querySelector('.celebration-title').textContent = title;
            document.getElementById('celebrationOverlay').classList.add('active');
        }

        function closeCelebration() {
            document.getElementById('celebrationOverlay').classList.remove('active');
        }

        // Confetti effect
        function createConfetti() {
            const colors = ['#38bdf8', '#22d3ee', '#4ade80', '#fbbf24', '#f472b6', '#a78bfa'];
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    confetti.className = 'confetti';
                    confetti.style.left = Math.random() * 100 + 'vw';
                    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
                    confetti.style.width = (Math.random() * 10 + 5) + 'px';
                    confetti.style.height = confetti.style.width;
                    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                    document.body.appendChild(confetti);

                    setTimeout(() => confetti.remove(), 3000);
                }, i * 50);
            }
        }

        // Render all tasks
        function renderTasks() {
            const container = document.getElementById('tasksContainer');
            const completedIds = loadProgress();

            courseData.forEach((week, weekIndex) => {
                const weekSection = document.createElement('section');
                weekSection.className = 'week-section';

                const weekTaskIds = week.tasks.map(t => t.id);
                const completedInWeek = weekTaskIds.filter(id => completedIds.includes(id)).length;

                weekSection.innerHTML = `
                    <div class="week-header">
                        <div class="week-icon">${weekIndex + 1}</div>
                        <h2 class="week-title">${week.week}</h2>
                        <span class="week-progress-mini">${completedInWeek}/${weekTaskIds.length}</span>
                    </div>
                `;

                week.tasks.forEach(task => {
                    const isCompleted = completedIds.includes(task.id);
                    const taskCard = document.createElement('div');
                    taskCard.className = `task-card ${isCompleted ? 'completed' : ''}`;
                    taskCard.dataset.taskId = task.id;

                    // Resource links HTML
                    let resourcesHtml = '';
                    if (task.resources && task.resources.length > 0) {
                        resourcesHtml = `
                            <div class="resource-links">
                                ${task.resources.map(r => `
                                    <a href="${r.url}" target="_blank" class="resource-link" onclick="event.stopPropagation()">
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                                        </svg>
                                        ${r.name}
                                    </a>
                                `).join('')}
                            </div>
                        `;
                    }

                    taskCard.innerHTML = `
                        <div class="checkbox-wrapper">
                            <input type="checkbox" class="checkbox-input" ${isCompleted ? 'checked' : ''}>
                            <div class="checkbox-custom">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                                </svg>
                            </div>
                        </div>
                        <div class="task-content">
                            <div class="task-date">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                </svg>
                                ${task.date}
                            </div>
                            <h3 class="task-title">${task.title}</h3>
                            <p class="task-desc">${task.desc}</p>
                            
                            <!-- Daily Challenge Box -->
                            <div class="challenge-box">
                                <div class="challenge-header">
                                    <svg class="challenge-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                    </svg>
                                    <span class="challenge-label">Günün Görevi</span>
                                </div>
                                <p class="challenge-text">${formatChallenge(task.challenge)}</p>
                            </div>
                            
                            ${resourcesHtml}
                        </div>
                    `;

                    taskCard.addEventListener('click', () => {
                        const currentCompleted = loadProgress();
                        toggleTask(task.id, currentCompleted);
                    });

                    weekSection.appendChild(taskCard);
                });

                container.appendChild(weekSection);
            });

            updateProgress(completedIds);
        }

        // Initialize app
        document.addEventListener('DOMContentLoaded', () => {
            renderTasks();
            updateCountdown();
            updateStreak();
            showRandomTip();

            // Update countdown every minute
            setInterval(updateCountdown, 60000);
        });

        // Style for tip transition
        document.getElementById('tipText').style.transition = 'opacity 0.2s ease';
    
