package es.leanmind.barbershop.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class AppointmentController {

    @GetMapping(Routes.appointments)
    public String show() {
        return "appointments";
    }

    @PostMapping(Routes.appointments)
    public String makeAppointment(Model model) {
        model.addAttribute("responseMessage", "Guay!");
        return "appointments";
    }
}