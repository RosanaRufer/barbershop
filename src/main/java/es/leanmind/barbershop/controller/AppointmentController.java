package es.leanmind.barbershop.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AppointmentController {

    @GetMapping(Routes.appointments)
    public String show() {
        return "appointments";
    }
}