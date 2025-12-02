# Sosyaliz Biz

Bu proje, gençlik hackathonu için geliştirilmiştir.

# Derece

100 + kişinin katıldığı etkinlikte 2 ön elemeden başarıyla geçmiş olsak da maalesef ilk 3'e giremedik. Fakat bunu uzun süre düşünüp neyi nerde hatalı yaptığımızı, eksiklerimizin ne olduğunu anladık ve daha önemlisi ilk hackathon tecrübemizi edinmiş olduk. Sonraki hackathonlarımızda hedefimiz sıralamaya oynamak.

# Tema

Genciz Biz uygulamasına entegre edilebilecek bir uygulama olması gerekmektedir. Projenin <b> sıfır yapay zeka </b> ile yapılması gerekmektedir.

## Projenin Ana Fikri

Sosyaliz Biz, insanların çeşitli etkinlikler (voleybol, basketbol gibi sporlar veya sinema, board games ve coffee talk gibi diğer sosyal aktiviteler) yapmak istediklerinde katılımcı bulma sorununu çözen bir uygulamadır. Kullanıcılar, bir etkinlik için ilan oluşturabilir ve kendi bölgelerindeki diğer ilgi duyan kişilerle kolayca eşleşerek bir araya gelebilirler.

---

## Kullanılan Teknolojiler

Bu projede aşağıdaki teknolojiler kullanılmıştır:

- Java, Spring Boot, React, PostgreSQL

---

## Projeyi Başlatma

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyebilirsiniz.

### Gereksinimler

-   Java JDK (Önerilen sürüm: 21)
-   Node.js ve npm (React için gereklidir)
-   Apache Maven

### Backend (Spring Boot)

Backend'i komut satırından başlatmak için aşağıdaki adımları izleyin:

1.  Terminal veya komut istemcisinde backend klasörünün içine gidin:
    ```bash
    cd sosyalizbiz-backend
    ```
2.  Projeyi derleyin ve bağımlılıkları yükleyin:
    ```bash
    ./mvnw clean install
    ```
3.  Spring Boot uygulamasını başlatın:
    ```bash
    ./mvnw spring-boot:run
    ```
    Sunucu varsayılan olarak `8080` portunda başlayacaktır.

### Frontend (React)


1.  Terminal veya komut istemcisinde frontend klasörünün içine gidin:
    ```bash
    cd sosyalizbiz-frontend
    ```
2.  Gerekli paketleri yükleyin:
    ```bash
    npm install
    ```
3.  Geliştirme sunucusunu başlatın:
    ```bash
    npm run dev
    ```
    Bu komut, React uygulamasını varsayılan olarak `3000` portunda çalıştıracak ve tarayıcıda açacaktır.
