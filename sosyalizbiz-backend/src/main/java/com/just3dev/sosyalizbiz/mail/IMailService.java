package com.just3dev.sosyalizbiz.mail;

import java.util.Date;

public interface IMailService {

    void sendMail(String to, String subject, String content) throws Exception;
    void sendReminderMail(String to, String eventname, Date activityDate);
    void sendMailWithTimer(String to, String subject, String content, Date sendDate);
    void sendNewActivityMail(String to, String eventname, Date activityDate);
}
