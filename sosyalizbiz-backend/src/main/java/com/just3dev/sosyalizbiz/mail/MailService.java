package com.just3dev.sosyalizbiz.mail;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Properties;

@Service
public class MailService implements IMailService{

    private final JavaMailSenderImpl mailSender;

    @Value("${spring.mail.username}")
    private String username;

    @Value("${spring.mail.password}")
    private String password;

    public MailService() {
        this.mailSender = new JavaMailSenderImpl();
        this.mailSender.setHost("smtp.gmail.com");
        this.mailSender.setPort(587);

        Properties props = this.mailSender.getJavaMailProperties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.starttls.required", "true");
    }

    public void sendMail(String to, String subject, String content) throws MessagingException {
        this.mailSender.setUsername(username);
        this.mailSender.setPassword(password);

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(content);

        mailSender.send(message);
    }

    public void sendMailWithTimer(String to, String subject, String content, Date sendDate) {
        long delayMillis = sendDate.getTime() - System.currentTimeMillis();
        if (delayMillis < 0) {
            delayMillis = 0; // If the send date is in the past, send immediately
        }
        long finalDelayMillis = delayMillis;
        new Thread(() -> {
            try {
                Thread.sleep(finalDelayMillis);
                sendMail(to, subject, content);
            } catch (InterruptedException | MessagingException e) {
                e.printStackTrace();
            }
        }).start();
    }

    public void sendReminderMail(String to, String eventname, Date activityDate) {
        String subject = "Etkinlik Hatırlatması: " + eventname;
        String content = " Etkinliğiniz '" + eventname + "' 2 saat içinde başlayacaktır. Lütfen zamanında katılmayı unutmayın!"
                + "\nEtkinliğe katılmadığınız takdirde SosyalizBiz hesabınızın güvenilirlik skoru düşebilir."
                + "\nGüvenilirlik skorunuzun düşük olması, gelecekteki etkinliklere katılımınızı olumsuz etkileyebilir."
                + "\nEtkinlik Adı: " + eventname
                + "\nEtkinlik Tarihi ve Saati: " + activityDate.toString()
                + "\n\nSosyalizBiz ile kalın!";

        Date reminderDate = new Date(activityDate.getTime() - 2 * 60 * 60 * 1000);
        sendMailWithTimer(to, subject, content, reminderDate);
    }


}
