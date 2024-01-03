import { z } from "zod";

import {
  get_SearchAppointment,
  get_SearchCareteam,
  get_SearchSchedule,
  get_SearchSlot,
  post_CreateAppointment,
  put_UpdateAppointment,
} from "../canvas/canvas-client";
import { handleFhirApiResponse } from "../lib/utils";
import { createTRPCRouter, protectedCanvasProcedure } from "../trpc";

export const schedulingRouter = createTRPCRouter({
  getPatientCareTeam: protectedCanvasProcedure
    .input(z.object({ patientId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { api } = ctx;
      const { patientId } = input;

      // search /CareTeam for patient's care team
      const careTeamData = await api.get("/CareTeam", {
        query: {
          patient: patientId,
        },
      });

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        careTeamData,
        get_SearchCareteam.response,
      );

      return validatedData;
    }),
  getSchedules: protectedCanvasProcedure.query(async ({ ctx }) => {
    const { api } = ctx;

    // search /Schedule
    const scheduleData = await api.get("/Schedule");

    // Validate response and check for OperationOutcome
    const validatedData = handleFhirApiResponse(
      scheduleData,
      get_SearchSchedule.response,
    );

    return validatedData;
  }),
  getSlots: protectedCanvasProcedure
    .input(get_SearchSlot.parameters)
    .query(async ({ ctx, input }) => {
      const { api } = ctx;
      const { query } = input;

      // search /Slot
      const slotData = await api.get("/Slot", {
        query,
      });

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        slotData,
        get_SearchSlot.response,
      );

      return validatedData;
    }),
  createAppointment: protectedCanvasProcedure
    .input(post_CreateAppointment.parameters)
    .mutation(async ({ ctx, input }) => {
      const { api } = ctx;
      const { body } = input;

      // create /Appointment
      const appointmentData = await api.post("/Appointment", {
        body,
      });

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        appointmentData,
        post_CreateAppointment.response,
      );

      return validatedData;
    }),
  updateAppointment: protectedCanvasProcedure
    .input(put_UpdateAppointment.parameters)
    .mutation(async ({ ctx, input }) => {
      const { api } = ctx;
      const { path, body } = input;

      // update /Appointment{id}
      const appointmentData = await api.put("/Appointment/{appointment_id}", {
        path,
        body,
      });

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        appointmentData,
        put_UpdateAppointment.response,
      );

      return validatedData;
    }),
  searchAppointments: protectedCanvasProcedure
    .input(get_SearchAppointment.parameters)
    .query(async ({ ctx, input }) => {
      const { api } = ctx;
      const { query } = input;

      // search /Appointment
      const appointmentData = await api.get("/Appointment", {
        query,
      });

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        appointmentData,
        get_SearchAppointment.response,
      );

      return validatedData;
    }),
});
