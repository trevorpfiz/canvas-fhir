import { z } from "zod";

import {
  get_SearchAllergyintolerance,
  get_SearchCondition,
  get_SearchConsent,
  get_SearchDiagnosticreport,
  get_SearchDocumentreference,
  get_SearchGoal,
  get_SearchImmunization,
  get_SearchMedicationstatement,
  get_SearchObservation,
  get_UpdateQuestionnaireresponse,
} from "../canvas/canvas-client";
import { handleFhirApiResponse } from "../lib/utils";
import { createTRPCRouter, protectedCanvasProcedure } from "../trpc";

export const patientMedicalHistoryRouter = createTRPCRouter({
  getPatientAllergies: protectedCanvasProcedure
    .input(z.object({ patientId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { api } = ctx;
      const { patientId } = input;

      // search /AllergyIntolerance for a patient's allergies
      const allergiesData = await api.get("/AllergyIntolerance", {
        query: {
          patient: patientId,
        },
      });

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        allergiesData,
        get_SearchAllergyintolerance.response,
      );

      return validatedData;
    }),
  getPatientConditions: protectedCanvasProcedure
    .input(z.object({ patientId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { api } = ctx;
      const { patientId } = input;

      // search /Condition for a patient's conditions
      const conditionsData = await api.get("/Condition", {
        query: {
          patient: patientId,
        },
      });

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        conditionsData,
        get_SearchCondition.response,
      );

      return validatedData;
    }),
  getPatientConsents: protectedCanvasProcedure
    .input(z.object({ patientId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { api } = ctx;
      const { patientId } = input;

      // search /Consent for a patient's consents
      const consentsData = await api.get("/Consent", {
        query: {
          patient: patientId,
        },
      });

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        consentsData,
        get_SearchConsent.response,
      );

      return validatedData;
    }),
  getPatientGoals: protectedCanvasProcedure
    .input(z.object({ patientId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { api } = ctx;
      const { patientId } = input;

      // search /Goal for a patient's goals
      const goalsData = await api.get("/Goal", {
        query: {
          patient: patientId,
        },
      });

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        goalsData,
        get_SearchGoal.response,
      );

      return validatedData;
    }),
  getPatientQuestionnaireResponses: protectedCanvasProcedure
    .input(z.object({ patientId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { api } = ctx;
      const { patientId } = input;

      // search /QuestionnaireResponse for a patient's questionnaire responses
      const questionnaireResponsesData = await api.get(
        "/QuestionnaireResponse",
        {
          query: {
            patient: patientId,
          },
          body: {}, // TODO - remove
        },
      );

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        questionnaireResponsesData,
        get_UpdateQuestionnaireresponse.response,
      );

      return validatedData;
    }),
  getPatientImmunizations: protectedCanvasProcedure
    .input(z.object({ patientId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { api } = ctx;
      const { patientId } = input;

      // search /Immunization for a patient's immunizations
      const immunizationsData = await api.get("/Immunization", {
        query: {
          patient: patientId,
        },
      });

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        immunizationsData,
        get_SearchImmunization.response,
      );

      return validatedData;
    }),
  getPatientMedications: protectedCanvasProcedure
    .input(z.object({ patientId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { api } = ctx;
      const { patientId } = input;

      // search /MedicationStatement for a patient's medications
      const medicationsData = await api.get("/MedicationStatement", {
        query: {
          patient: patientId,
        },
      });

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        medicationsData,
        get_SearchMedicationstatement.response,
      );

      return validatedData;
    }),
  getPatientDiagnosticReports: protectedCanvasProcedure
    .input(z.object({ patientId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { api } = ctx;
      const { patientId } = input;

      // search /DiagnosticReport for a patient's diagnostic reports
      const diagnosticReportsData = await api.get("/DiagnosticReport", {
        query: {
          patient: patientId,
        },
      });

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        diagnosticReportsData,
        get_SearchDiagnosticreport.response,
      );

      return validatedData;
    }),
  getPatientDocuments: protectedCanvasProcedure
    .input(z.object({ patientId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { api } = ctx;
      const { patientId } = input;

      // search /DocumentReference for a patient's documents
      const documentsData = await api.get("/DocumentReference", {
        query: {
          patient: patientId,
          // type: "http://loinc.org|11502-2", // FIXME - not working for documents other than lab reports and bills?
        },
      });

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        documentsData,
        get_SearchDocumentreference.response,
      );

      return validatedData;
    }),
  getPatientObservations: protectedCanvasProcedure
    .input(z.object({ patientId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { api } = ctx;
      const { patientId } = input;

      // search /Observation for a patient's observations
      const observationsData = await api.get("/Observation", {
        query: {
          patient: patientId,
          category: "vital-signs",
        },
      });

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        observationsData,
        get_SearchObservation.response,
      );

      return validatedData;
    }),
});
