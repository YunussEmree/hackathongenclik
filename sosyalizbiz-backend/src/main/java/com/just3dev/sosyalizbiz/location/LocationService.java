package com.just3dev.sosyalizbiz.location;

import org.springframework.stereotype.Service;

@Service
public class LocationService implements ILocationService {

    public String sendtoLocation(String location) {
        return "https://maps.google.com/?q=" + location.replace(" ", "+");
    }
}
