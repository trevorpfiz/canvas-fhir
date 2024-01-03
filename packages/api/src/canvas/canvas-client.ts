import z from "zod";

import {
  readAllergenResponseSchema,
  searchAllergenResponseSchema,
} from "@acme/shared/src/validators/allergen";
import {
  readAllergyIntoleranceResponseSchema,
  searchAllergyIntoleranceResponseSchema,
} from "@acme/shared/src/validators/allergy-intolerance";
import {
  readAppointmentResponseSchema,
  searchAppointmentResponseSchema,
} from "@acme/shared/src/validators/appointment";
import {
  readCareTeamResponseSchema,
  searchCareTeamResponseSchema,
} from "@acme/shared/src/validators/care-team";
import {
  readCommunicationResponseSchema,
  searchCommunicationResponseSchema,
} from "@acme/shared/src/validators/communication";
import {
  readConditionResponseSchema,
  searchConditionResponseSchema,
} from "@acme/shared/src/validators/condition";
import {
  readConsentResponseSchema,
  searchConsentResponseSchema,
} from "@acme/shared/src/validators/consent";
import {
  readCoverageResponseSchema,
  searchCoverageResponseSchema,
} from "@acme/shared/src/validators/coverage";
import {
  readDiagnosticReportResponseSchema,
  searchDiagnosticReportResponseSchema,
} from "@acme/shared/src/validators/diagnostic-report";
import {
  readDocumentReferenceResponseSchema,
  searchDocumentReferenceResponseSchema,
} from "@acme/shared/src/validators/document-reference";
import {
  readEncounterResponseSchema,
  searchEncounterResponseSchema,
} from "@acme/shared/src/validators/encounter";
import {
  readGoalResponseSchema,
  searchGoalResponseSchema,
} from "@acme/shared/src/validators/goal";
import {
  readImmunizationResponseSchema,
  searchImmunizationResponseSchema,
} from "@acme/shared/src/validators/immunization";
import {
  readMedicationResponseSchema,
  searchMedicationResponseSchema,
} from "@acme/shared/src/validators/medication";
import {
  readMedicationRequestResponseSchema,
  searchMedicationRequestResponseSchema,
} from "@acme/shared/src/validators/medication-request";
import {
  readMedicationStatementResponseSchema,
  searchMedicationStatementResponseSchema,
} from "@acme/shared/src/validators/medication-statement";
import {
  readObservationResponseSchema,
  searchObservationResponseSchema,
} from "@acme/shared/src/validators/observation";
import { postOrPutResponseSchema } from "@acme/shared/src/validators/operation-outcome";
import {
  readPatientResponseSchema,
  searchPatientResponseSchema,
} from "@acme/shared/src/validators/patient";
import {
  readPaymentNoticeResponseSchema,
  searchPaymentNoticeResponseSchema,
} from "@acme/shared/src/validators/payment";
import {
  readPractitionerResponseSchema,
  searchPractitionerResponseSchema,
} from "@acme/shared/src/validators/practitioner";
import {
  readQuestionnaireResponseSchema,
  searchQuestionnaireResponseSchema,
} from "@acme/shared/src/validators/questionnaire";
import {
  readQuestionnaireResponseResponseSchema,
  searchQuestionnaireResponseResponseSchema,
} from "@acme/shared/src/validators/questionnaire-response";
import { searchScheduleResponseSchema } from "@acme/shared/src/validators/schedule";
import { searchSlotResponseSchema } from "@acme/shared/src/validators/slot";
import { searchTaskResponseSchema } from "@acme/shared/src/validators/task";

export type post_GetAnOauthToken = typeof post_GetAnOauthToken;
export const post_GetAnOauthToken = {
  method: z.literal("POST"),
  path: z.literal("/auth/token/"),
  parameters: z.object({
    body: z.object({
      client_id: z.string().optional(),
      client_secret: z.string().optional(),
      grant_type: z.string().optional(),
    }),
  }),
  response: z.unknown(),
};

export type get_ReadAllergen = typeof get_ReadAllergen;
export const get_ReadAllergen = {
  method: z.literal("GET"),
  path: z.literal("/Allergen/{allergen_id}"),
  parameters: z.object({
    path: z.object({
      allergen_id: z.string(),
    }),
  }),
  response: readAllergenResponseSchema,
};

export type get_SearchAllergen = typeof get_SearchAllergen;
export const get_SearchAllergen = {
  method: z.literal("GET"),
  path: z.literal("/Allergen"),
  parameters: z.object({
    query: z.object({
      code: z.string().optional(),
      _text: z.string().optional(),
    }),
  }),
  response: searchAllergenResponseSchema,
};

export type get_SearchAllergyintolerance = typeof get_SearchAllergyintolerance;
export const get_SearchAllergyintolerance = {
  method: z.literal("GET"),
  path: z.literal("/AllergyIntolerance"),
  parameters: z.object({
    query: z.object({
      patient: z.string().optional(),
    }),
  }),
  response: searchAllergyIntoleranceResponseSchema,
};

export type put_UpdateAllergyintolerance = typeof put_UpdateAllergyintolerance;
export const put_UpdateAllergyintolerance = {
  method: z.literal("PUT"),
  path: z.literal("/AllergyIntolerance"),
  parameters: z.object({
    body: z.object({
      clinicalStatus: z
        .object({
          coding: z
            .array(
              z.object({
                code: z.string().optional(),
                display: z.string().optional(),
                system: z.string().optional(),
              }),
            )
            .optional(),
          text: z.string().optional(),
        })
        .optional(),
      code: z
        .object({
          coding: z
            .array(
              z.object({
                code: z.string().optional(),
                display: z.string().optional(),
                system: z.string().optional(),
              }),
            )
            .optional(),
          text: z.string().optional(),
        })
        .optional(),
      encounter: z
        .object({
          reference: z.string().optional(),
        })
        .optional(),
      lastOccurrence: z.string().optional(),
      note: z
        .array(
          z.object({
            text: z.string().optional(),
          }),
        )
        .optional(),
      onsetDateTime: z.string().optional(),
      patient: z
        .object({
          reference: z.string().optional(),
        })
        .optional(),
      reaction: z
        .array(
          z.object({
            manifestation: z
              .array(
                z.object({
                  coding: z
                    .array(
                      z.object({
                        code: z.string().optional(),
                        display: z.string().optional(),
                        system: z.string().optional(),
                      }),
                    )
                    .optional(),
                  text: z.string().optional(),
                }),
              )
              .optional(),
            severity: z.string().optional(),
          }),
        )
        .optional(),
      recorder: z
        .object({
          reference: z.string().optional(),
        })
        .optional(),
      resourceType: z.string().optional(),
      type: z.string().optional(),
      verificationStatus: z
        .object({
          coding: z
            .array(
              z.object({
                code: z.string().optional(),
                display: z.string().optional(),
                system: z.string().optional(),
              }),
            )
            .optional(),
          text: z.string().optional(),
        })
        .optional(),
    }),
  }),
  response: postOrPutResponseSchema,
};

export type post_CreateAllergyintolerance =
  typeof post_CreateAllergyintolerance;
export const post_CreateAllergyintolerance = {
  method: z.literal("POST"),
  path: z.literal("/AllergyIntolerance"),
  parameters: z.object({
    body: z.object({
      clinicalStatus: z
        .object({
          coding: z
            .array(
              z.object({
                code: z.string().optional(),
                display: z.string().optional(),
                system: z.string().optional(),
              }),
            )
            .optional(),
          text: z.string().optional(),
        })
        .optional(),
      code: z
        .object({
          coding: z
            .array(
              z.object({
                code: z.string().optional(),
                display: z.string().optional(),
                system: z.string().optional(),
              }),
            )
            .optional(),
          text: z.string().optional(),
        })
        .optional(),
      encounter: z
        .object({
          reference: z.string().optional(),
        })
        .optional(),
      lastOccurrence: z.string().optional(),
      note: z
        .array(
          z.object({
            text: z.string().optional(),
          }),
        )
        .optional(),
      onsetDateTime: z.string().optional(),
      patient: z
        .object({
          reference: z.string().optional(),
        })
        .optional(),
      reaction: z
        .array(
          z.object({
            manifestation: z
              .array(
                z.object({
                  coding: z
                    .array(
                      z.object({
                        code: z.string().optional(),
                        display: z.string().optional(),
                        system: z.string().optional(),
                      }),
                    )
                    .optional(),
                  text: z.string().optional(),
                }),
              )
              .optional(),
            severity: z.string().optional(),
          }),
        )
        .optional(),
      recorder: z
        .object({
          reference: z.string().optional(),
        })
        .optional(),
      resourceType: z.string().optional(),
      type: z.string().optional(),
      verificationStatus: z
        .object({
          coding: z
            .array(
              z.object({
                code: z.string().optional(),
                display: z.string().optional(),
                system: z.string().optional(),
              }),
            )
            .optional(),
          text: z.string().optional(),
        })
        .optional(),
    }),
  }),
  response: postOrPutResponseSchema,
};

export type get_ReadAllergyintolerance = typeof get_ReadAllergyintolerance;
export const get_ReadAllergyintolerance = {
  method: z.literal("GET"),
  path: z.literal("/AllergyIntolerance/{allergy_intolerance_id}"),
  parameters: z.object({
    path: z.object({
      allergy_intolerance_id: z.string(),
    }),
  }),
  response: readAllergyIntoleranceResponseSchema,
};

export type get_SearchAppointment = typeof get_SearchAppointment;
export const get_SearchAppointment = {
  method: z.literal("GET"),
  path: z.literal("/Appointment"),
  parameters: z.object({
    query: z.object({
      date: z.string().optional(),
      practitioner: z.string().optional(),
      patient: z.string().optional(),
      status: z.string().optional(),
      "appointment-type": z.string().optional(),
      location: z.string().optional(),
      _count: z.string().optional(),
      _offset: z.string().optional(),
      _sort: z.string().optional(),
    }),
    body: z.unknown(),
  }),
  response: searchAppointmentResponseSchema,
};

export type post_CreateAppointment = typeof post_CreateAppointment;
export const post_CreateAppointment = {
  method: z.literal("POST"),
  path: z.literal("/Appointment"),
  parameters: z.object({
    body: z.object({
      appointmentType: z
        .object({
          coding: z
            .array(
              z.object({
                code: z.string().optional(),
                display: z.string().optional(),
                system: z.string().optional(),
              }),
            )
            .optional(),
        })
        .optional(),
      contained: z
        .array(
          z.object({
            address: z.string().optional(),
            connectionType: z.object({}).optional(),
            id: z.string().optional(),
            payloadType: z.array(z.unknown()).optional(),
            resourceType: z.string().optional(),
            status: z.string().optional(),
          }),
        )
        .optional(),
      description: z.string().optional(),
      end: z.string().optional(),
      participant: z
        .array(
          z.object({
            actor: z
              .object({
                reference: z.string().optional(),
              })
              .optional(),
            status: z.string().optional(),
          }),
        )
        .optional(),
      resourceType: z.string().optional(),
      start: z.string().optional(),
      status: z.string().optional(),
      supportingInformation: z
        .array(
          z.object({
            reference: z.string().optional(),
            type: z.string().optional(),
          }),
        )
        .optional(),
    }),
  }),
  response: postOrPutResponseSchema,
};

export type get_ReadAppointment = typeof get_ReadAppointment;
export const get_ReadAppointment = {
  method: z.literal("GET"),
  path: z.literal("/Appointment/{appointment_id}"),
  parameters: z.object({
    path: z.object({
      appointment_id: z.string(),
    }),
  }),
  response: readAppointmentResponseSchema,
};

export type put_UpdateAppointment = typeof put_UpdateAppointment;
export const put_UpdateAppointment = {
  method: z.literal("PUT"),
  path: z.literal("/Appointment/{appointment_id}"),
  parameters: z.object({
    path: z.object({
      appointment_id: z.string(),
    }),
    body: z.object({
      appointmentType: z
        .object({
          coding: z
            .array(
              z.object({
                code: z.string().optional(),
                display: z.string().optional(),
                system: z.string().optional(),
              }),
            )
            .optional(),
        })
        .optional(),
      contained: z
        .array(
          z.object({
            address: z.string().optional(),
            connectionType: z.object({}).optional(),
            id: z.string().optional(),
            payloadType: z.array(z.unknown()).optional(),
            resourceType: z.string().optional(),
            status: z.string().optional(),
          }),
        )
        .optional(),
      description: z.string().optional(),
      end: z.string().optional(),
      participant: z
        .array(
          z.object({
            actor: z
              .object({
                reference: z.string().optional(),
              })
              .optional(),
            status: z.string().optional(),
          }),
        )
        .optional(),
      resourceType: z.string().optional(),
      start: z.string().optional(),
      status: z.string().optional(),
      supportingInformation: z
        .array(
          z.object({
            reference: z.string().optional(),
          }),
        )
        .optional(),
    }),
  }),
  response: postOrPutResponseSchema,
};

export type get_ReadCareplan = typeof get_ReadCareplan;
export const get_ReadCareplan = {
  method: z.literal("GET"),
  path: z.literal("/CarePlan/{care_plan_id}"),
  parameters: z.object({
    path: z.object({
      care_plan_id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_SearchCareplan = typeof get_SearchCareplan;
export const get_SearchCareplan = {
  method: z.literal("GET"),
  path: z.literal("/CarePlan"),
  parameters: z.object({
    query: z.object({
      patient: z.string().optional(),
      category: z.string().optional(),
    }),
  }),
  response: z.unknown(),
};

export type get_ReadCareteam = typeof get_ReadCareteam;

export const get_ReadCareteam = {
  method: z.literal("GET"),
  path: z.literal("/CareTeam/{care_team_id}"),
  parameters: z.object({
    path: z.object({
      care_team_id: z.string(),
    }),
  }),
  response: readCareTeamResponseSchema,
};

export type put_UpdateCareteam = typeof put_UpdateCareteam;
export const put_UpdateCareteam = {
  method: z.literal("PUT"),
  path: z.literal("/CareTeam/{care_team_id}"),
  parameters: z.object({
    path: z.object({
      care_team_id: z.string(),
    }),
    body: z.object({
      participant: z
        .array(
          z.object({
            member: z
              .object({
                reference: z.string().optional(),
              })
              .optional(),
            role: z
              .array(
                z.object({
                  coding: z
                    .array(
                      z.object({
                        code: z.string().optional(),
                        display: z.string().optional(),
                        system: z.string().optional(),
                      }),
                    )
                    .optional(),
                }),
              )
              .optional(),
          }),
        )
        .optional(),
      resourceType: z.string().optional(),
      subject: z
        .object({
          reference: z.string().optional(),
        })
        .optional(),
    }),
  }),
  response: postOrPutResponseSchema,
};

export type get_SearchCareteam = typeof get_SearchCareteam;
export const get_SearchCareteam = {
  method: z.literal("GET"),
  path: z.literal("/CareTeam"),
  parameters: z.object({
    query: z.object({
      participant: z.string().optional(),
      status: z.string().optional(),
      patient: z.string().optional(),
    }),
  }),
  response: searchCareTeamResponseSchema,
};

export type post_CreateClaim = typeof post_CreateClaim;
export const post_CreateClaim = {
  method: z.literal("POST"),
  path: z.literal("/Claim"),
  parameters: z.object({
    body: z.object({
      created: z.string().optional(),
      diagnosis: z
        .array(
          z.object({
            diagnosisCodeableConcept: z
              .object({
                coding: z
                  .array(
                    z.object({
                      code: z.string().optional(),
                      display: z.string().optional(),
                      system: z.string().optional(),
                    }),
                  )
                  .optional(),
                text: z.string().optional(),
              })
              .optional(),
            sequence: z.number().optional(),
          }),
        )
        .optional(),
      insurance: z
        .array(
          z.object({
            coverage: z
              .object({
                reference: z.string().optional(),
              })
              .optional(),
            focal: z.boolean().optional(),
            sequence: z.number().optional(),
          }),
        )
        .optional(),
      item: z
        .array(
          z.object({
            diagnosisSequence: z.array(z.number()).optional(),
            modifier: z
              .array(
                z.object({
                  coding: z
                    .array(
                      z.object({
                        code: z.string().optional(),
                        system: z.string().optional(),
                      }),
                    )
                    .optional(),
                }),
              )
              .optional(),
            net: z
              .object({
                value: z.number().optional(),
              })
              .optional(),
            productOrService: z
              .object({
                coding: z
                  .array(
                    z.object({
                      code: z.string().optional(),
                      display: z.string().optional(),
                      system: z.string().optional(),
                    }),
                  )
                  .optional(),
              })
              .optional(),
            quantity: z
              .object({
                value: z.number().optional(),
              })
              .optional(),
            sequence: z.number().optional(),
            servicedDate: z.string().optional(),
            unitPrice: z
              .object({
                value: z.number().optional(),
              })
              .optional(),
          }),
        )
        .optional(),
      patient: z
        .object({
          reference: z.string().optional(),
        })
        .optional(),
      priority: z
        .object({
          coding: z
            .array(
              z.object({
                code: z.string().optional(),
                system: z.string().optional(),
              }),
            )
            .optional(),
        })
        .optional(),
      provider: z
        .object({
          reference: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),
      resourceType: z.string().optional(),
      status: z.string().optional(),
      supportingInfo: z
        .array(
          z.object({
            category: z
              .object({
                coding: z
                  .array(
                    z.object({
                      code: z.string().optional(),
                      display: z.string().optional(),
                      system: z.string().optional(),
                    }),
                  )
                  .optional(),
              })
              .optional(),
            sequence: z.number().optional(),
            valueString: z.string().optional(),
          }),
        )
        .optional(),
      type: z
        .object({
          coding: z
            .array(
              z.object({
                code: z.string().optional(),
                system: z.string().optional(),
              }),
            )
            .optional(),
        })
        .optional(),
      use: z.string().optional(),
    }),
  }),
  response: postOrPutResponseSchema,
};

export type get_SearchCommunicationSender =
  typeof get_SearchCommunicationSender;
export const get_SearchCommunicationSender = {
  method: z.literal("GET"),
  path: z.literal("/Communication"),
  parameters: z.object({
    query: z.object({
      patient: z.string().optional(),
      sender: z.string().optional(),
      recipient: z.string().optional(),
      _id: z.string().optional(),
    }),
  }),
  response: searchCommunicationResponseSchema,
};

export type post_CreateCommunication = typeof post_CreateCommunication;
export const post_CreateCommunication = {
  method: z.literal("POST"),
  path: z.literal("/Communication"),
  parameters: z.object({
    body: z.object({
      payload: z
        .array(
          z.object({
            contentString: z.string().optional(),
          }),
        )
        .optional(),
      received: z.string().optional(),
      recipient: z
        .array(
          z.object({
            reference: z.string().optional(),
          }),
        )
        .optional(),
      resourceType: z.string().optional(),
      sender: z
        .object({
          reference: z.string().optional(),
        })
        .optional(),
      sent: z.string().optional(),
      status: z.string().optional(),
    }),
  }),
  response: postOrPutResponseSchema,
};

export type get_ReadCommunication = typeof get_ReadCommunication;
export const get_ReadCommunication = {
  method: z.literal("GET"),
  path: z.literal("/Communication/{communication_id}"),
  parameters: z.object({
    path: z.object({
      communication_id: z.string(),
    }),
  }),
  response: readCommunicationResponseSchema,
};

export type get_SearchCondition = typeof get_SearchCondition;
export const get_SearchCondition = {
  method: z.literal("GET"),
  path: z.literal("/Condition"),
  parameters: z.object({
    query: z.object({
      patient: z.string().optional(),
    }),
  }),
  response: searchConditionResponseSchema,
};

export type put_UpdateCondition = typeof put_UpdateCondition;
export const put_UpdateCondition = {
  method: z.literal("PUT"),
  path: z.literal("/Condition"),
  parameters: z.object({
    body: z.object({
      abatementDateTime: z.string().optional(),
      category: z
        .array(
          z.object({
            coding: z
              .array(
                z.object({
                  code: z.string().optional(),
                  display: z.string().optional(),
                  system: z.string().optional(),
                }),
              )
              .optional(),
            text: z.string().optional(),
          }),
        )
        .optional(),
      clinicalStatus: z
        .object({
          coding: z
            .array(
              z.object({
                code: z.string().optional(),
                display: z.string().optional(),
                system: z.string().optional(),
              }),
            )
            .optional(),
          text: z.string().optional(),
        })
        .optional(),
      code: z
        .object({
          coding: z
            .array(
              z.object({
                code: z.string().optional(),
                display: z.string().optional(),
                system: z.string().optional(),
              }),
            )
            .optional(),
          text: z.string().optional(),
        })
        .optional(),
      encounter: z
        .object({
          reference: z.string().optional(),
        })
        .optional(),
      note: z
        .array(
          z.object({
            text: z.string().optional(),
          }),
        )
        .optional(),
      onsetDateTime: z.string().optional(),
      recordedDate: z.string().optional(),
      recorder: z
        .object({
          reference: z.string().optional(),
        })
        .optional(),
      resourceType: z.string().optional(),
      subject: z
        .object({
          reference: z.string().optional(),
        })
        .optional(),
      verificationStatus: z
        .object({
          coding: z
            .array(
              z.object({
                code: z.string().optional(),
                display: z.string().optional(),
                system: z.string().optional(),
              }),
            )
            .optional(),
          text: z.string().optional(),
        })
        .optional(),
    }),
  }),
  response: postOrPutResponseSchema,
};

export type post_CreateCondition = typeof post_CreateCondition;
export const post_CreateCondition = {
  method: z.literal("POST"),
  path: z.literal("/Condition"),
  parameters: z.object({
    body: z.object({
      abatementDateTime: z.string().optional(),
      category: z
        .array(
          z.object({
            coding: z
              .array(
                z.object({
                  code: z.string().optional(),
                  display: z.string().optional(),
                  system: z.string().optional(),
                }),
              )
              .optional(),
            text: z.string().optional(),
          }),
        )
        .optional(),
      clinicalStatus: z
        .object({
          coding: z
            .array(
              z.object({
                code: z.string().optional(),
                display: z.string().optional(),
                system: z.string().optional(),
              }),
            )
            .optional(),
          text: z.string().optional(),
        })
        .optional(),
      code: z
        .object({
          coding: z
            .array(
              z.object({
                code: z.string().optional(),
                display: z.string().optional(),
                system: z.string().optional(),
              }),
            )
            .optional(),
          text: z.string().optional(),
        })
        .optional(),
      encounter: z
        .object({
          reference: z.string().optional(),
        })
        .optional(),
      note: z
        .array(
          z.object({
            text: z.string().optional(),
          }),
        )
        .optional(),
      onsetDateTime: z.string().optional(),
      recordedDate: z.string().optional(),
      recorder: z
        .object({
          reference: z.string().optional(),
        })
        .optional(),
      resourceType: z.string().optional(),
      subject: z
        .object({
          reference: z.string().optional(),
        })
        .optional(),
      verificationStatus: z
        .object({
          coding: z
            .array(
              z.object({
                code: z.string().optional(),
                display: z.string().optional(),
                system: z.string().optional(),
              }),
            )
            .optional(),
          text: z.string().optional(),
        })
        .optional(),
    }),
  }),
  response: postOrPutResponseSchema,
};

export type get_ReadCondition = typeof get_ReadCondition;
export const get_ReadCondition = {
  method: z.literal("GET"),
  path: z.literal("/Condition/{condition_id}"),
  parameters: z.object({
    path: z.object({
      condition_id: z.string(),
    }),
  }),
  response: readConditionResponseSchema,
};

export type get_SearchConsent = typeof get_SearchConsent;
export const get_SearchConsent = {
  method: z.literal("GET"),
  path: z.literal("/Consent"),
  parameters: z.object({
    query: z.object({
      _id: z.string().optional(),
      patient: z.string().optional(),
      period: z.string().optional(),
    }),
  }),
  response: searchConsentResponseSchema,
};

export type post_CreateConsent = typeof post_CreateConsent;
export const post_CreateConsent = {
  method: z.literal("POST"),
  path: z.literal("/Consent"),
  parameters: z.object({
    body: z.object({
      category: z
        .array(
          z.object({
            coding: z
              .array(
                z.object({
                  code: z.string().optional(),
                  display: z.string().optional(),
                  system: z.string().optional(),
                }),
              )
              .optional(),
          }),
        )
        .optional(),
      patient: z
        .object({
          reference: z.string().optional(),
        })
        .optional(),
      provision: z
        .object({
          period: z
            .object({
              end: z.string().optional(),
              start: z.string().optional(),
            })
            .optional(),
        })
        .optional(),
      resourceType: z.string().optional(),
      scope: z.object({}).optional(),
      sourceAttachment: z
        .object({
          contentType: z.string().optional(),
          data: z.string().optional(),
          title: z.string().optional(),
        })
        .optional(),
      status: z.string().optional(),
    }),
  }),
  response: postOrPutResponseSchema,
};

export type get_ReadConsent = typeof get_ReadConsent;
export const get_ReadConsent = {
  method: z.literal("GET"),
  path: z.literal("/Consent/{consent_id}"),
  parameters: z.object({
    path: z.object({
      consent_id: z.string(),
    }),
  }),
  response: readConsentResponseSchema,
};

export type get_SearchCoverage = typeof get_SearchCoverage;
export const get_SearchCoverage = {
  method: z.literal("GET"),
  path: z.literal("/Coverage"),
  parameters: z.object({
    query: z.object({
      interaction: z.string().optional(),
      patient: z.string().optional(),
      subscriberid: z.string().optional(),
      _count: z.string().optional(),
      _offset: z.string().optional(),
    }),
  }),
  response: searchCoverageResponseSchema,
};

export type post_CreateCoverage = typeof post_CreateCoverage;
export const post_CreateCoverage = {
  method: z.literal("POST"),
  path: z.literal("/Coverage"),
  parameters: z.object({
    query: z.object({
      interaction: z.string().optional(),
    }),
    body: z.object({
      beneficiary: z
        .object({
          reference: z.string().optional(),
        })
        .optional(),
      class: z
        .array(
          z.object({
            type: z
              .object({
                coding: z
                  .array(
                    z.object({
                      code: z.string().optional(),
                      system: z.string().optional(),
                    }),
                  )
                  .optional(),
              })
              .optional(),
            value: z.string().optional(),
          }),
        )
        .optional(),
      order: z.number().optional(),
      payor: z
        .array(
          z.object({
            display: z.string().optional(),
            identifier: z
              .object({
                system: z.string().optional(),
                value: z.string().optional(),
              })
              .optional(),
          }),
        )
        .optional(),
      period: z
        .object({
          start: z.string().optional(),
        })
        .optional(),
      relationship: z
        .object({
          coding: z
            .array(
              z.object({
                code: z.string().optional(),
                system: z.string().optional(),
              }),
            )
            .optional(),
        })
        .optional(),
      resourceType: z.string().optional(),
      status: z.string().optional(),
      subscriber: z
        .object({
          reference: z.string().optional(),
        })
        .optional(),
      subscriberId: z.string().optional(),
      type: z
        .object({
          coding: z
            .array(
              z.object({
                code: z.string().optional(),
                display: z.string().optional(),
                system: z.string().optional(),
              }),
            )
            .optional(),
          text: z.string().optional(),
        })
        .optional(),
    }),
  }),
  response: postOrPutResponseSchema,
};

export type get_ReadCoverage = typeof get_ReadCoverage;
export const get_ReadCoverage = {
  method: z.literal("GET"),
  path: z.literal("/Coverage{coverage_id}"),
  parameters: z.object({
    path: z.object({
      coverage_id: z.string(),
    }),
  }),
  response: readCoverageResponseSchema,
};

export type put_UpdateCoverage = typeof put_UpdateCoverage;
export const put_UpdateCoverage = {
  method: z.literal("PUT"),
  path: z.literal("/Coverage/{coverage_id}"),
  parameters: z.object({
    query: z.object({
      interaction: z.string().optional(),
    }),
    path: z.object({
      coverage_id: z.string(),
    }),
    body: z.object({
      beneficiary: z
        .object({
          reference: z.string().optional(),
        })
        .optional(),
      class: z
        .array(
          z.object({
            type: z
              .object({
                coding: z
                  .array(
                    z.object({
                      code: z.string().optional(),
                      system: z.string().optional(),
                    }),
                  )
                  .optional(),
              })
              .optional(),
            value: z.string().optional(),
          }),
        )
        .optional(),
      order: z.number().optional(),
      payor: z
        .array(
          z.object({
            display: z.string().optional(),
            identifier: z
              .object({
                system: z.string().optional(),
                value: z.string().optional(),
              })
              .optional(),
          }),
        )
        .optional(),
      period: z
        .object({
          start: z.string().optional(),
        })
        .optional(),
      relationship: z
        .object({
          coding: z
            .array(
              z.object({
                code: z.string().optional(),
                system: z.string().optional(),
              }),
            )
            .optional(),
        })
        .optional(),
      resourceType: z.string().optional(),
      status: z.string().optional(),
      subscriber: z
        .object({
          reference: z.string().optional(),
        })
        .optional(),
      subscriberId: z.string().optional(),
      type: z
        .object({
          coding: z
            .array(
              z.object({
                code: z.string().optional(),
                display: z.string().optional(),
                system: z.string().optional(),
              }),
            )
            .optional(),
          text: z.string().optional(),
        })
        .optional(),
    }),
  }),
  response: postOrPutResponseSchema,
};

export type post_CreateCoverageeligibilityrequest =
  typeof post_CreateCoverageeligibilityrequest;
export const post_CreateCoverageeligibilityrequest = {
  method: z.literal("POST"),
  path: z.literal("/CoverageEligibilityRequest"),
  parameters: z.object({
    body: z.object({
      insurance: z
        .array(
          z.object({
            coverage: z
              .object({
                reference: z.string().optional(),
              })
              .optional(),
            focal: z.boolean().optional(),
          }),
        )
        .optional(),
      patient: z
        .object({
          reference: z.string().optional(),
        })
        .optional(),
      purpose: z.array(z.string()).optional(),
      resourceType: z.string().optional(),
      status: z.string().optional(),
    }),
  }),
  response: postOrPutResponseSchema,
};

export type get_SearchCoverageeligibilityresponseRequestId =
  typeof get_SearchCoverageeligibilityresponseRequestId;
export const get_SearchCoverageeligibilityresponseRequestId = {
  method: z.literal("GET"),
  path: z.literal("/CoverageEligibilityResponse"),
  parameters: z.object({
    query: z.object({
      request: z.string().optional(),
    }),
  }),
  response: z.unknown(),
};

export type get_ReadDevice = typeof get_ReadDevice;
export const get_ReadDevice = {
  method: z.literal("GET"),
  path: z.literal("/Device/{device_id}"),
  parameters: z.object({
    path: z.object({
      device_id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_SearchDevice = typeof get_SearchDevice;
export const get_SearchDevice = {
  method: z.literal("GET"),
  path: z.literal("/Device"),
  parameters: z.object({
    query: z.object({
      patient: z.string().optional(),
    }),
  }),
  response: z.unknown(),
};

export type get_ReadDiagnosticreport = typeof get_ReadDiagnosticreport;
export const get_ReadDiagnosticreport = {
  method: z.literal("GET"),
  path: z.literal("/DiagnosticReport/{diagnostic_report_id}"),
  parameters: z.object({
    path: z.object({
      diagnostic_report_id: z.string(),
    }),
  }),
  response: readDiagnosticReportResponseSchema,
};

export type get_SearchDiagnosticreport = typeof get_SearchDiagnosticreport;
export const get_SearchDiagnosticreport = {
  method: z.literal("GET"),
  path: z.literal("/DiagnosticReport"),
  parameters: z.object({
    query: z.object({
      patient: z.string().optional(),
      date: z.string().optional(),
      category: z.string().optional(),
      code: z.string().optional(),
    }),
  }),
  response: searchDiagnosticReportResponseSchema,
};

export type get_ReadDocumentreference = typeof get_ReadDocumentreference;
export const get_ReadDocumentreference = {
  method: z.literal("GET"),
  path: z.literal("/DocumentReference/{document_reference_id}"),
  parameters: z.object({
    path: z.object({
      document_reference_id: z.string(),
    }),
  }),
  response: readDocumentReferenceResponseSchema,
};

export type get_SearchDocumentreference = typeof get_SearchDocumentreference;
export const get_SearchDocumentreference = {
  method: z.literal("GET"),
  path: z.literal("/DocumentReference"),
  parameters: z.object({
    query: z.object({
      date: z.string().optional(),
      subject: z.string().optional(),
      status: z.string().optional(),
      type: z.string().optional(),
      _id: z.string().optional(),
      category: z.string().optional(),
      patient: z.string().optional(),
    }),
  }),
  response: searchDocumentReferenceResponseSchema,
};

export type get_ReadEncounter = typeof get_ReadEncounter;
export const get_ReadEncounter = {
  method: z.literal("GET"),
  path: z.literal("/Encounter/{encounter_id}"),
  parameters: z.object({
    path: z.object({
      encounter_id: z.string(),
    }),
  }),
  response: readEncounterResponseSchema,
};

export type get_SearchEncounter = typeof get_SearchEncounter;
export const get_SearchEncounter = {
  method: z.literal("GET"),
  path: z.literal("/Encounter"),
  parameters: z.object({
    query: z.object({
      appointment: z.string().optional(),
      date: z.string().optional(),
      patient: z.string().optional(),
    }),
  }),
  response: searchEncounterResponseSchema,
};

export type get_ReadGoal = typeof get_ReadGoal;
export const get_ReadGoal = {
  method: z.literal("GET"),
  path: z.literal("/Goal/{goal_id}"),
  parameters: z.object({
    path: z.object({
      goal_id: z.string(),
    }),
  }),
  response: readGoalResponseSchema,
};

export type get_SearchGoal = typeof get_SearchGoal;
export const get_SearchGoal = {
  method: z.literal("GET"),
  path: z.literal("/Goal"),
  parameters: z.object({
    query: z.object({
      patient: z.string().optional(),
    }),
  }),
  response: searchGoalResponseSchema,
};

export type get_SearchGroup = typeof get_SearchGroup;
export const get_SearchGroup = {
  method: z.literal("GET"),
  path: z.literal("/Group"),
  parameters: z.object({
    query: z.object({
      type: z.string().optional(),
    }),
  }),
  response: z.unknown(),
};

export type post_CreateGroupTeam = typeof post_CreateGroupTeam;
export const post_CreateGroupTeam = {
  method: z.literal("POST"),
  path: z.literal("/Group"),
  parameters: z.object({
    body: z.object({
      actual: z.boolean().optional(),
      member: z
        .array(
          z.object({
            entity: z
              .object({
                reference: z.string().optional(),
                type: z.string().optional(),
              })
              .optional(),
          }),
        )
        .optional(),
      name: z.string().optional(),
      resourceType: z.string().optional(),
      type: z.string().optional(),
    }),
  }),
  response: postOrPutResponseSchema,
};

export type get_ReadGroup = typeof get_ReadGroup;
export const get_ReadGroup = {
  method: z.literal("GET"),
  path: z.literal("/Group/{person_group_id}"),
  parameters: z.object({
    path: z.object({
      person_group_id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type put_UpdateGroupPatientGroup = typeof put_UpdateGroupPatientGroup;
export const put_UpdateGroupPatientGroup = {
  method: z.literal("PUT"),
  path: z.literal("/Group/{person_group_id}"),
  parameters: z.object({
    path: z.object({
      person_group_id: z.string(),
    }),
    body: z.object({
      actual: z.boolean().optional(),
      member: z
        .array(
          z.object({
            entity: z
              .object({
                reference: z.string().optional(),
                type: z.string().optional(),
              })
              .optional(),
            inactive: z.boolean().optional(),
          }),
        )
        .optional(),
      name: z.string().optional(),
      resourceType: z.string().optional(),
      type: z.string().optional(),
    }),
  }),
  response: postOrPutResponseSchema,
};

export type put_UpdateGroupTeam = typeof put_UpdateGroupTeam;
export const put_UpdateGroupTeam = {
  method: z.literal("PUT"),
  path: z.literal("/Group/{practitioner_group_id}"),
  parameters: z.object({
    path: z.object({
      practitioner_group_id: z.string(),
    }),
    body: z.object({
      actual: z.boolean().optional(),
      characteristic: z
        .array(
          z.object({
            code: z
              .object({
                text: z.string().optional(),
              })
              .optional(),
            exclude: z.boolean().optional(),
            valueCodeableConcept: z
              .object({
                text: z.string().optional(),
              })
              .optional(),
          }),
        )
        .optional(),
      member: z
        .array(
          z.object({
            entity: z
              .object({
                reference: z.string().optional(),
                type: z.string().optional(),
              })
              .optional(),
          }),
        )
        .optional(),
      name: z.string().optional(),
      resourceType: z.string().optional(),
      type: z.string().optional(),
    }),
  }),
  response: z.unknown(),
};

export type get_ReadImmunization = typeof get_ReadImmunization;
export const get_ReadImmunization = {
  method: z.literal("GET"),
  path: z.literal("/Immunization/{immunization_id}"),
  parameters: z.object({
    path: z.object({
      immunization_id: z.string(),
    }),
  }),
  response: readImmunizationResponseSchema,
};

export type get_SearchImmunization = typeof get_SearchImmunization;
export const get_SearchImmunization = {
  method: z.literal("GET"),
  path: z.literal("/Immunization"),
  parameters: z.object({
    query: z.object({
      patient: z.string().optional(),
    }),
  }),
  response: searchImmunizationResponseSchema,
};

export type get_ReadLocation = typeof get_ReadLocation;
export const get_ReadLocation = {
  method: z.literal("GET"),
  path: z.literal("/Location/{location_id}"),
  parameters: z.object({
    path: z.object({
      location_id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_SearchLocation = typeof get_SearchLocation;
export const get_SearchLocation = {
  method: z.literal("GET"),
  path: z.literal("/Location"),
  parameters: z.never(),
  response: z.unknown(),
};

export type get_SearchMedia = typeof get_SearchMedia;
export const get_SearchMedia = {
  method: z.literal("GET"),
  path: z.literal("/Media"),
  parameters: z.object({
    query: z.object({
      patient: z.string().optional(),
      _id: z.string().optional(),
    }),
  }),
  response: z.unknown(),
};

export type post_CreateMedia = typeof post_CreateMedia;
export const post_CreateMedia = {
  method: z.literal("POST"),
  path: z.literal("/Media"),
  parameters: z.object({
    body: z.object({
      content: z
        .object({
          contentType: z.string().optional(),
          data: z.string().optional(),
          title: z.string().optional(),
        })
        .optional(),
      encounter: z
        .object({
          reference: z.string().optional(),
        })
        .optional(),
      note: z
        .array(
          z.object({
            text: z.string().optional(),
          }),
        )
        .optional(),
      operator: z
        .object({
          reference: z.string().optional(),
        })
        .optional(),
      resourceType: z.string().optional(),
      status: z.string().optional(),
      subject: z
        .object({
          reference: z.string().optional(),
        })
        .optional(),
    }),
  }),
  response: postOrPutResponseSchema,
};

export type get_ReadMedia = typeof get_ReadMedia;
export const get_ReadMedia = {
  method: z.literal("GET"),
  path: z.literal("/Media/{media_id}"),
  parameters: z.object({
    path: z.object({
      media_id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_ReadMedication = typeof get_ReadMedication;
export const get_ReadMedication = {
  method: z.literal("GET"),
  path: z.literal("/Medication/{medication_id}"),
  parameters: z.object({
    path: z.object({
      medication_id: z.string(),
    }),
  }),
  response: readMedicationResponseSchema,
};

export type get_SearchMedication = typeof get_SearchMedication;
export const get_SearchMedication = {
  method: z.literal("GET"),
  path: z.literal("/Medication"),
  parameters: z.object({
    query: z.object({
      code: z.string().optional(),
      _text: z.string().optional(),
    }),
  }),
  response: searchMedicationResponseSchema,
};

export type get_ReadMedicationrequest = typeof get_ReadMedicationrequest;
export const get_ReadMedicationrequest = {
  method: z.literal("GET"),
  path: z.literal("/MedicationRequest/{medication_request_id}"),
  parameters: z.object({
    path: z.object({
      medication_request_id: z.string(),
    }),
  }),
  response: readMedicationRequestResponseSchema,
};

export type get_SearchMedicationrequest = typeof get_SearchMedicationrequest;
export const get_SearchMedicationrequest = {
  method: z.literal("GET"),
  path: z.literal("/MedicationRequest"),
  parameters: z.object({
    query: z.object({
      patient: z.string().optional(),
      status: z.string().optional(),
      intent: z.string().optional(),
    }),
  }),
  response: searchMedicationRequestResponseSchema,
};

export type get_SearchMedicationstatement =
  typeof get_SearchMedicationstatement;
export const get_SearchMedicationstatement = {
  method: z.literal("GET"),
  path: z.literal("/MedicationStatement"),
  parameters: z.object({
    query: z.object({
      patient: z.string().optional(),
    }),
  }),
  response: searchMedicationStatementResponseSchema,
};

export type put_UpdateMedicationstatement =
  typeof put_UpdateMedicationstatement;
export const put_UpdateMedicationstatement = {
  method: z.literal("PUT"),
  path: z.literal("/MedicationStatement"),
  parameters: z.object({
    body: z.object({
      context: z
        .object({
          reference: z.string().optional(),
        })
        .optional(),
      dosage: z
        .array(
          z.object({
            text: z.string().optional(),
          }),
        )
        .optional(),
      effectivePeriod: z
        .object({
          end: z.string().optional(),
          start: z.string().optional(),
        })
        .optional(),
      medicationReference: z
        .object({
          display: z.string().optional(),
          reference: z.string().optional(),
        })
        .optional(),
      resourceType: z.string().optional(),
      status: z.string().optional(),
      subject: z
        .object({
          reference: z.string().optional(),
        })
        .optional(),
    }),
  }),
  response: postOrPutResponseSchema,
};

export type post_CreateMedicationstatement =
  typeof post_CreateMedicationstatement;
export const post_CreateMedicationstatement = {
  method: z.literal("POST"),
  path: z.literal("/MedicationStatement"),
  parameters: z.object({
    body: z.object({
      context: z
        .object({
          reference: z.string().optional(),
        })
        .optional(),
      dosage: z
        .array(
          z.object({
            text: z.string().optional(),
          }),
        )
        .optional(),
      effectivePeriod: z
        .object({
          end: z.string().optional(),
          start: z.string().optional(),
        })
        .optional(),
      medicationReference: z
        .object({
          display: z.string().optional(),
          reference: z.string().optional(),
        })
        .optional(),
      resourceType: z.string().optional(),
      status: z.string().optional(),
      subject: z
        .object({
          reference: z.string().optional(),
        })
        .optional(),
    }),
  }),
  response: postOrPutResponseSchema,
};

export type get_ReadMedicationstatement = typeof get_ReadMedicationstatement;
export const get_ReadMedicationstatement = {
  method: z.literal("GET"),
  path: z.literal("/MedicationStatement/{medication_statement_id}"),
  parameters: z.object({
    path: z.object({
      medication_statement_id: z.string(),
    }),
  }),
  response: readMedicationStatementResponseSchema,
};

export type get_SearchObservation = typeof get_SearchObservation;
export const get_SearchObservation = {
  method: z.literal("GET"),
  path: z.literal("/Observation"),
  parameters: z.object({
    query: z.object({
      patient: z.string().optional(),
      code: z.string().optional(),
      category: z.string().optional(),
      "derived-from": z.string().optional(),
      date: z.string().optional(),
      _id: z.string().optional(),
    }),
    body: z.unknown(),
  }),
  response: searchObservationResponseSchema,
};

export type post_CreateObservationWComponents =
  typeof post_CreateObservationWComponents;
export const post_CreateObservationWComponents = {
  method: z.literal("POST"),
  path: z.literal("/Observation"),
  parameters: z.object({
    body: z.object({
      category: z
        .array(
          z.object({
            coding: z
              .array(
                z.object({
                  code: z.string().optional(),
                  display: z.string().optional(),
                  system: z.string().optional(),
                }),
              )
              .optional(),
          }),
        )
        .optional(),
      code: z
        .object({
          coding: z
            .array(
              z.object({
                code: z.string().optional(),
                display: z.string().optional(),
                system: z.string().optional(),
              }),
            )
            .optional(),
        })
        .optional(),
      effectiveDateTime: z.string().optional(),
      hasMember: z
        .array(
          z.object({
            reference: z.string().optional(),
          }),
        )
        .optional(),
      status: z.string().optional(),
      subject: z
        .object({
          reference: z.string().optional(),
        })
        .optional(),
    }),
  }),
  response: postOrPutResponseSchema,
};

export type get_ReadObservation = typeof get_ReadObservation;
export const get_ReadObservation = {
  method: z.literal("GET"),
  path: z.literal("/Observation/{observation_id}"),
  parameters: z.object({
    path: z.object({
      observation_id: z.string(),
    }),
  }),
  response: readObservationResponseSchema,
};

export type get_ReadOrganization = typeof get_ReadOrganization;
export const get_ReadOrganization = {
  method: z.literal("GET"),
  path: z.literal("/Organization/{organization_id}"),
  parameters: z.object({
    path: z.object({
      organization_id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_SearchOrganization = typeof get_SearchOrganization;
export const get_SearchOrganization = {
  method: z.literal("GET"),
  path: z.literal("/Organization"),
  parameters: z.never(),
  response: z.unknown(),
};

export type get_SearchPatient = typeof get_SearchPatient;
export const get_SearchPatient = {
  method: z.literal("GET"),
  path: z.literal("/Patient"),
  parameters: z.object({
    query: z.object({
      identifier: z.string().optional(),
      name: z.string().optional(),
      gender: z.string().optional(),
      family: z.string().optional(),
      given: z.string().optional(),
      nickname: z.string().optional(),
      birthdate: z.string().optional(),
      email: z.string().optional(),
      phone: z.string().optional(),
      _count: z.string().optional(),
      _offset: z.string().optional(),
      _id: z.string().optional(),
      active: z.string().optional(),
      "_has:CareTeam:participant:member": z.string().optional(),
      _sort: z.string().optional(),
    }),
  }),
  response: searchPatientResponseSchema,
};

export type post_CreatePatient = typeof post_CreatePatient;
export const post_CreatePatient = {
  method: z.literal("POST"),
  path: z.literal("/Patient"),
  parameters: z.object({
    body: z.object({
      active: z.boolean().optional(),
      address: z
        .array(
          z.object({
            city: z.string().optional(),
            line: z.array(z.string()).optional(),
            postalCode: z.string().optional(),
            state: z.string().optional(),
            text: z.string().optional(),
            type: z.string().optional(),
            use: z.string().optional(),
          }),
        )
        .optional(),
      birthDate: z.string().optional(),
      communication: z
        .array(
          z.object({
            language: z
              .object({
                coding: z
                  .array(
                    z.object({
                      code: z.string().optional(),
                      display: z.string().optional(),
                      system: z.string().optional(),
                    }),
                  )
                  .optional(),
                text: z.string().optional(),
              })
              .optional(),
          }),
        )
        .optional(),
      contact: z
        .array(
          z.object({
            extension: z
              .array(
                z.object({
                  url: z.string().optional(),
                  valueBoolean: z.boolean().optional(),
                }),
              )
              .optional(),
            name: z
              .object({
                text: z.string().optional(),
              })
              .optional(),
            relationship: z
              .array(
                z.object({
                  text: z.string().optional(),
                }),
              )
              .optional(),
            telecom: z
              .array(
                z.object({
                  system: z.string().optional(),
                  value: z.string().optional(),
                }),
              )
              .optional(),
          }),
        )
        .optional(),
      extension: z
        .array(
          z.object({
            extension: z
              .array(
                z.object({
                  url: z.string().optional(),
                  valueIdentifier: z
                    .object({
                      system: z.string().optional(),
                      value: z.string().optional(),
                    })
                    .optional(),
                }),
              )
              .optional(),
            url: z.string().optional(),
            valueCode: z.string().optional(),
            valueString: z.string().optional(),
          }),
        )
        .optional(),
      gender: z.string().optional(),
      identifier: z
        .array(
          z.object({
            system: z.string().optional(),
            use: z.string().optional(),
            value: z.string().optional(),
          }),
        )
        .optional(),
      name: z
        .array(
          z.object({
            family: z.string().optional(),
            given: z.array(z.string()).optional(),
            use: z.string().optional(),
          }),
        )
        .optional(),
      resourceType: z.string().optional(),
      telecom: z
        .array(
          z.object({
            rank: z.number().optional(),
            system: z.string().optional(),
            use: z.string().optional(),
            value: z.string().optional(),
          }),
        )
        .optional(),
    }),
  }),
  response: postOrPutResponseSchema,
};

export type get_ReadPatient = typeof get_ReadPatient;
export const get_ReadPatient = {
  method: z.literal("GET"),
  path: z.literal("/Patient/{patient_id}"),
  parameters: z.object({
    path: z.object({
      patient_id: z.string(),
    }),
  }),
  response: readPatientResponseSchema,
};

export type put_UpdatePatient = typeof put_UpdatePatient;
export const put_UpdatePatient = {
  method: z.literal("PUT"),
  path: z.literal("/Patient/{patient_id}"),
  parameters: z.object({
    path: z.object({
      patient_id: z.string(),
    }),
    body: z.object({
      active: z.boolean().optional(),
      address: z
        .array(
          z.object({
            city: z.string().optional(),
            line: z.array(z.string()).optional(),
            postalCode: z.string().optional(),
            state: z.string().optional(),
            text: z.string().optional(),
            type: z.string().optional(),
            use: z.string().optional(),
          }),
        )
        .optional(),
      birthDate: z.string().optional(),
      communication: z
        .array(
          z.object({
            language: z
              .object({
                coding: z
                  .array(
                    z.object({
                      code: z.string().optional(),
                      display: z.string().optional(),
                      system: z.string().optional(),
                    }),
                  )
                  .optional(),
                text: z.string().optional(),
              })
              .optional(),
          }),
        )
        .optional(),
      contact: z
        .array(
          z.object({
            extension: z
              .array(
                z.object({
                  url: z.string().optional(),
                  valueBoolean: z.boolean().optional(),
                }),
              )
              .optional(),
            name: z
              .object({
                text: z.string().optional(),
              })
              .optional(),
            relationship: z
              .array(
                z.object({
                  text: z.string().optional(),
                }),
              )
              .optional(),
            telecom: z
              .array(
                z.object({
                  system: z.string().optional(),
                  value: z.string().optional(),
                }),
              )
              .optional(),
          }),
        )
        .optional(),
      extension: z
        .array(
          z.object({
            extension: z
              .array(
                z.object({
                  url: z.string().optional(),
                  valueIdentifier: z
                    .object({
                      system: z.string().optional(),
                      value: z.string().optional(),
                    })
                    .optional(),
                }),
              )
              .optional(),
            url: z.string().optional(),
            valueCode: z.string().optional(),
          }),
        )
        .optional(),
      gender: z.string().optional(),
      identifier: z
        .array(
          z.object({
            system: z.string().optional(),
            use: z.string().optional(),
            value: z.string().optional(),
          }),
        )
        .optional(),
      name: z
        .array(
          z.object({
            family: z.string().optional(),
            given: z.array(z.string()).optional(),
            use: z.string().optional(),
          }),
        )
        .optional(),
      resourceType: z.string().optional(),
      telecom: z
        .array(
          z.object({
            rank: z.number().optional(),
            system: z.string().optional(),
            use: z.string().optional(),
            value: z.string().optional(),
          }),
        )
        .optional(),
    }),
  }),
  response: postOrPutResponseSchema,
};

export type get_SearchPaymentnotice = typeof get_SearchPaymentnotice;
export const get_SearchPaymentnotice = {
  method: z.literal("GET"),
  path: z.literal("/PaymentNotice"),
  parameters: z.object({
    query: z.object({
      _id: z.string().optional(),
      request: z.string().optional(),
    }),
  }),
  response: searchPaymentNoticeResponseSchema,
};

export type post_CreatePaymentnotice = typeof post_CreatePaymentnotice;
export const post_CreatePaymentnotice = {
  method: z.literal("POST"),
  path: z.literal("/PaymentNotice"),
  parameters: z.object({
    body: z.object({
      amount: z
        .object({
          currency: z.string().optional(),
          value: z.number().optional(),
        })
        .optional(),
      created: z.string().optional(),
      payment: z.object({}),
      recipient: z.object({}),
      request: z
        .object({
          reference: z.string().optional(),
        })
        .optional(),
      resourceType: z.string().optional(),
      status: z.string().optional(),
    }),
  }),
  response: postOrPutResponseSchema,
};

export type get_ReadPaymentnotice = typeof get_ReadPaymentnotice;
export const get_ReadPaymentnotice = {
  method: z.literal("GET"),
  path: z.literal("/PaymentNotice/{paymentnotice_id}"),
  parameters: z.object({
    path: z.object({
      paymentnotice_id: z.string(),
    }),
  }),
  response: readPaymentNoticeResponseSchema,
};

export type get_ReadPractitioner = typeof get_ReadPractitioner;
export const get_ReadPractitioner = {
  method: z.literal("GET"),
  path: z.literal("/Practitioner/{practitioner_a_id}"),
  parameters: z.object({
    path: z.object({
      practitioner_a_id: z.string(),
    }),
  }),
  response: readPractitionerResponseSchema,
};

export type get_SearchPractitioner = typeof get_SearchPractitioner;

export const get_SearchPractitioner = {
  method: z.literal("GET"),
  path: z.literal("/Practitioner"),
  parameters: z.object({
    query: z.object({
      "include-non-scheduleable-practitioners": z.string().optional(),
      name: z.string().optional(),
    }),
  }),
  response: searchPractitionerResponseSchema,
};

export type get_ReadProcedure = typeof get_ReadProcedure;
export const get_ReadProcedure = {
  method: z.literal("GET"),
  path: z.literal("/Procedure/{procedure_id}"),
  parameters: z.object({
    path: z.object({
      procedure_id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_SearchProcedure = typeof get_SearchProcedure;
export const get_SearchProcedure = {
  method: z.literal("GET"),
  path: z.literal("/Procedure"),
  parameters: z.object({
    query: z.object({
      patient: z.string().optional(),
      date: z.string().optional(),
    }),
  }),
  response: z.unknown(),
};

export type get_ReadQuestionnaire = typeof get_ReadQuestionnaire;
export const get_ReadQuestionnaire = {
  method: z.literal("GET"),
  path: z.literal("/Questionnaire/{questionnaire_id}"),
  parameters: z.object({
    path: z.object({
      questionnaire_id: z.string(),
    }),
  }),
  response: readQuestionnaireResponseSchema,
};

export type get_SearchQuestionnaire = typeof get_SearchQuestionnaire;
export const get_SearchQuestionnaire = {
  method: z.literal("GET"),
  path: z.literal("/Questionnaire"),
  parameters: z.object({
    query: z.object({
      identifier: z.string().optional(),
      code: z.string().optional(),
      name: z.string().optional(),
      "questionnaire-code": z.string().optional(),
      status: z.string().optional(),
    }),
  }),
  response: searchQuestionnaireResponseSchema,
};

// TODO - bugged generation, need to split the search and update
export type get_UpdateQuestionnaireresponse =
  typeof get_UpdateQuestionnaireresponse;
export const get_UpdateQuestionnaireresponse = {
  method: z.literal("GET"),
  path: z.literal("/QuestionnaireResponse"),
  parameters: z.object({
    query: z.object({
      _id: z.string().optional(),
      _sort: z.string().optional(),
      authored: z.string().optional(),
      patient: z.string().optional(),
      questionnaire: z.string().optional(),
      "questionnaire.code": z.string().optional(),
      "questionnaire.item.code": z.string().optional(),
    }),
    body: z.object({
      author: z
        .object({
          reference: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),
      authored: z.string().optional(),
      item: z
        .array(
          z.object({
            answer: z
              .array(
                z.object({
                  valueCoding: z
                    .object({
                      code: z.string().optional(),
                      display: z.string().optional(),
                      system: z.string().optional(),
                    })
                    .optional(),
                }),
              )
              .optional(),
            linkId: z.string().optional(),
            text: z.string().optional(),
          }),
        )
        .optional(),
      questionnaire: z.string().optional(),
      resourceType: z.string().optional(),
      status: z.string().optional(),
      subject: z
        .object({
          reference: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),
    }),
  }),
  response: searchQuestionnaireResponseResponseSchema,
};

export type post_CreateQuestionnaireresponse =
  typeof post_CreateQuestionnaireresponse;
export const post_CreateQuestionnaireresponse = {
  method: z.literal("POST"),
  path: z.literal("/QuestionnaireResponse"),
  parameters: z.object({
    body: z.object({
      author: z
        .object({
          reference: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),
      authored: z.string().optional(),
      item: z
        .array(
          z.object({
            answer: z
              .array(
                z.object({
                  valueCoding: z
                    .object({
                      code: z.string().optional(),
                      display: z.string().optional(),
                      system: z.string().optional(),
                    })
                    .optional(),
                  valueString: z.string().optional(),
                }),
              )
              .optional(),
            linkId: z.string().optional(),
            text: z.string().optional(),
          }),
        )
        .optional(),
      questionnaire: z.string().optional(),
      resourceType: z.string().optional(),
      status: z.string().optional(),
      subject: z
        .object({
          reference: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),
      extension: z
        .object({
          url: z.string(),
          valueString: z.string().optional(),
        })
        .optional(),
    }),
  }),
  response: postOrPutResponseSchema,
};

export type get_ReadQuestionnaireresponse =
  typeof get_ReadQuestionnaireresponse;
export const get_ReadQuestionnaireresponse = {
  method: z.literal("GET"),
  path: z.literal("/QuestionnaireResponse/{questionnaire_response_id}"),
  parameters: z.object({
    path: z.object({
      questionnaire_response_id: z.string(),
    }),
  }),
  response: readQuestionnaireResponseResponseSchema,
};

export type get_SearchSchedule = typeof get_SearchSchedule;
export const get_SearchSchedule = {
  method: z.literal("GET"),
  path: z.literal("/Schedule"),
  parameters: z.never(),
  response: searchScheduleResponseSchema,
};

export type get_SearchSlot = typeof get_SearchSlot;
export const get_SearchSlot = {
  method: z.literal("GET"),
  path: z.literal("/Slot"),
  parameters: z.object({
    query: z.object({
      schedule: z.string().optional(),
      start: z.string().optional(),
      duration: z.string().optional(),
      end: z.string().optional(),
    }),
  }),
  response: searchSlotResponseSchema,
};

export type get_SearchTask = typeof get_SearchTask;
export const get_SearchTask = {
  method: z.literal("GET"),
  path: z.literal("/Task"),
  parameters: z.object({
    query: z.object({
      requester: z.string().optional(),
      patient: z.string().optional(),
      _id: z.string().optional(),
      owner: z.string().optional(),
    }),
  }),
  response: searchTaskResponseSchema,
};

export type post_CreateTask = typeof post_CreateTask;
export const post_CreateTask = {
  method: z.literal("POST"),
  path: z.literal("/Task"),
  parameters: z.object({
    body: z.object({
      authoredOn: z.string().optional(),
      description: z.string().optional(),
      extension: z
        .array(
          z.object({
            url: z.string().optional(),
            valueReference: z
              .object({
                reference: z.string().optional(),
              })
              .optional(),
          }),
        )
        .optional(),
      for: z
        .object({
          reference: z.string().optional(),
        })
        .optional(),
      input: z
        .array(
          z.object({
            type: z
              .object({
                text: z.string().optional(),
              })
              .optional(),
            valueString: z.string().optional(),
          }),
        )
        .optional(),
      intent: z.string().optional(),
      note: z
        .array(
          z.object({
            authorReference: z
              .object({
                reference: z.string().optional(),
              })
              .optional(),
            text: z.string().optional(),
            time: z.string().optional(),
          }),
        )
        .optional(),
      owner: z
        .object({
          reference: z.string().optional(),
        })
        .optional(),
      requester: z
        .object({
          reference: z.string().optional(),
        })
        .optional(),
      resourceType: z.string().optional(),
      restriction: z
        .object({
          period: z
            .object({
              end: z.string().optional(),
            })
            .optional(),
        })
        .optional(),
      status: z.string().optional(),
    }),
  }),
  response: postOrPutResponseSchema,
};

export type put_UpdateTask = typeof put_UpdateTask;
export const put_UpdateTask = {
  method: z.literal("PUT"),
  path: z.literal("/Task/{task_id}"),
  parameters: z.object({
    path: z.object({
      task_id: z.string(),
    }),
    body: z.object({
      authoredOn: z.string().optional(),
      description: z.string().optional(),
      extension: z
        .array(
          z.object({
            url: z.string().optional(),
            valueReference: z
              .object({
                reference: z.string().optional(),
              })
              .optional(),
          }),
        )
        .optional(),
      for: z
        .object({
          reference: z.string().optional(),
        })
        .optional(),
      id: z.string().optional(),
      input: z
        .array(
          z.object({
            type: z
              .object({
                text: z.string().optional(),
              })
              .optional(),
            valueString: z.string().optional(),
          }),
        )
        .optional(),
      intent: z.string().optional(),
      note: z
        .array(
          z.object({
            authorReference: z
              .object({
                reference: z.string().optional(),
              })
              .optional(),
            text: z.string().optional(),
            time: z.string().optional(),
          }),
        )
        .optional(),
      owner: z
        .object({
          reference: z.string().optional(),
        })
        .optional(),
      requester: z
        .object({
          reference: z.string().optional(),
        })
        .optional(),
      resourceType: z.string().optional(),
      restriction: z
        .object({
          period: z
            .object({
              end: z.string().optional(),
            })
            .optional(),
        })
        .optional(),
      status: z.string().optional(),
    }),
  }),
  response: postOrPutResponseSchema,
};

// <EndpointByMethod>
export const EndpointByMethod = {
  post: {
    "/auth/token/": post_GetAnOauthToken,
    "/AllergyIntolerance": post_CreateAllergyintolerance,
    "/Appointment": post_CreateAppointment,
    "/Claim": post_CreateClaim,
    "/Communication": post_CreateCommunication,
    "/Condition": post_CreateCondition,
    "/Consent": post_CreateConsent,
    "/Coverage": post_CreateCoverage,
    "/CoverageEligibilityRequest": post_CreateCoverageeligibilityrequest,
    "/Group": post_CreateGroupTeam,
    "/Media": post_CreateMedia,
    "/MedicationStatement": post_CreateMedicationstatement,
    "/Observation": post_CreateObservationWComponents,
    "/Patient": post_CreatePatient,
    "/PaymentNotice": post_CreatePaymentnotice,
    "/QuestionnaireResponse": post_CreateQuestionnaireresponse,
    "/Task": post_CreateTask,
  },
  get: {
    "/Allergen/{allergen_id}": get_ReadAllergen,
    "/Allergen": get_SearchAllergen,
    "/AllergyIntolerance": get_SearchAllergyintolerance,
    "/AllergyIntolerance/{allergy_intolerance_id}": get_ReadAllergyintolerance,
    "/Appointment": get_SearchAppointment,
    "/Appointment/{appointment_id}": get_ReadAppointment,
    "/CarePlan/{care_plan_id}": get_ReadCareplan,
    "/CarePlan": get_SearchCareplan,
    "/CareTeam/{care_team_id}": get_ReadCareteam,
    "/CareTeam": get_SearchCareteam,
    "/Communication": get_SearchCommunicationSender,
    "/Communication/{communication_id}": get_ReadCommunication,
    "/Condition": get_SearchCondition,
    "/Condition/{condition_id}": get_ReadCondition,
    "/Consent": get_SearchConsent,
    "/Consent/{consent_id}": get_ReadConsent,
    "/Coverage": get_SearchCoverage,
    "/Coverage{coverage_id}": get_ReadCoverage,
    "/CoverageEligibilityResponse":
      get_SearchCoverageeligibilityresponseRequestId,
    "/Device/{device_id}": get_ReadDevice,
    "/Device": get_SearchDevice,
    "/DiagnosticReport/{diagnostic_report_id}": get_ReadDiagnosticreport,
    "/DiagnosticReport": get_SearchDiagnosticreport,
    "/DocumentReference/{document_reference_id}": get_ReadDocumentreference,
    "/DocumentReference": get_SearchDocumentreference,
    "/Encounter/{encounter_id}": get_ReadEncounter,
    "/Encounter": get_SearchEncounter,
    "/Goal/{goal_id}": get_ReadGoal,
    "/Goal": get_SearchGoal,
    "/Group": get_SearchGroup,
    "/Group/{person_group_id}": get_ReadGroup,
    "/Immunization/{immunization_id}": get_ReadImmunization,
    "/Immunization": get_SearchImmunization,
    "/Location/{location_id}": get_ReadLocation,
    "/Location": get_SearchLocation,
    "/Media": get_SearchMedia,
    "/Media/{media_id}": get_ReadMedia,
    "/Medication/{medication_id}": get_ReadMedication,
    "/Medication": get_SearchMedication,
    "/MedicationRequest/{medication_request_id}": get_ReadMedicationrequest,
    "/MedicationRequest": get_SearchMedicationrequest,
    "/MedicationStatement": get_SearchMedicationstatement,
    "/MedicationStatement/{medication_statement_id}":
      get_ReadMedicationstatement,
    "/Observation": get_SearchObservation,
    "/Observation/{observation_id}": get_ReadObservation,
    "/Organization/{organization_id}": get_ReadOrganization,
    "/Organization": get_SearchOrganization,
    "/Patient": get_SearchPatient,
    "/Patient/{patient_id}": get_ReadPatient,
    "/PaymentNotice": get_SearchPaymentnotice,
    "/PaymentNotice/{paymentnotice_id}": get_ReadPaymentnotice,
    "/Practitioner/{practitioner_a_id}": get_ReadPractitioner,
    "/Practitioner": get_SearchPractitioner,
    "/Procedure/{procedure_id}": get_ReadProcedure,
    "/Procedure": get_SearchProcedure,
    "/Questionnaire/{questionnaire_id}": get_ReadQuestionnaire,
    "/Questionnaire": get_SearchQuestionnaire,
    "/QuestionnaireResponse": get_UpdateQuestionnaireresponse,
    "/QuestionnaireResponse/{questionnaire_response_id}":
      get_ReadQuestionnaireresponse,
    "/Schedule": get_SearchSchedule,
    "/Slot": get_SearchSlot,
    "/Task": get_SearchTask,
  },
  put: {
    "/AllergyIntolerance": put_UpdateAllergyintolerance,
    "/Appointment/{appointment_id}": put_UpdateAppointment,
    "/CareTeam/{care_team_id}": put_UpdateCareteam,
    "/Condition": put_UpdateCondition,
    "/Coverage/{coverage_id}": put_UpdateCoverage,
    "/Group/{person_group_id}": put_UpdateGroupPatientGroup,
    "/Group/{practitioner_group_id}": put_UpdateGroupTeam,
    "/MedicationStatement": put_UpdateMedicationstatement,
    "/Patient/{patient_id}": put_UpdatePatient,
    "/Task/{task_id}": put_UpdateTask,
  },
};
export type EndpointByMethod = typeof EndpointByMethod;
// </EndpointByMethod>

// <EndpointByMethod.Shorthands>
export type PostEndpoints = EndpointByMethod["post"];
export type GetEndpoints = EndpointByMethod["get"];
export type PutEndpoints = EndpointByMethod["put"];
export type AllEndpoints = EndpointByMethod[keyof EndpointByMethod];
// </EndpointByMethod.Shorthands>

// <ApiClientTypes>
export interface EndpointParameters {
  body?: unknown;
  query?: Record<string, unknown>;
  header?: Record<string, unknown>;
  path?: Record<string, unknown>;
}

export type MutationMethod = "post" | "put" | "patch" | "delete";
export type Method = "get" | "head" | MutationMethod;

export interface DefaultEndpoint {
  parameters?: EndpointParameters | undefined;
  response: unknown;
}

export interface Endpoint<TConfig extends DefaultEndpoint = DefaultEndpoint> {
  operationId: string;
  method: Method;
  path: string;
  parameters?: TConfig["parameters"];
  meta: {
    alias: string;
    hasParameters: boolean;
    areParametersRequired: boolean;
  };
  response: TConfig["response"];
}

type Fetcher = (
  method: Method,
  url: string,
  parameters?: EndpointParameters | undefined,
) => Promise<Endpoint["response"]>;

type RequiredKeys<T> = {
  [P in keyof T]-?: undefined extends T[P] ? never : P;
}[keyof T];

type MaybeOptionalArg<T> = RequiredKeys<T> extends never
  ? [config?: T]
  : [config: T];

// </ApiClientTypes>

// <ApiClient>
export class ApiClient {
  baseUrl = "";

  constructor(public fetcher: Fetcher) {}

  setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl;
    return this;
  }

  // <ApiClient.post>
  post<Path extends keyof PostEndpoints, TEndpoint extends PostEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<z.infer<TEndpoint["parameters"]>>
  ): Promise<z.infer<TEndpoint["response"]>> {
    return this.fetcher("post", this.baseUrl + path, params[0]);
  }
  // </ApiClient.post>

  // <ApiClient.get>
  get<Path extends keyof GetEndpoints, TEndpoint extends GetEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<z.infer<TEndpoint["parameters"]>>
  ): Promise<z.infer<TEndpoint["response"]>> {
    return this.fetcher("get", this.baseUrl + path, params[0]);
  }
  // </ApiClient.get>

  // <ApiClient.put>
  put<Path extends keyof PutEndpoints, TEndpoint extends PutEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<z.infer<TEndpoint["parameters"]>>
  ): Promise<z.infer<TEndpoint["response"]>> {
    return this.fetcher("put", this.baseUrl + path, params[0]);
  }
  // </ApiClient.put>
}

export function createApiClient(fetcher: Fetcher, baseUrl?: string) {
  return new ApiClient(fetcher).setBaseUrl(baseUrl ?? "");
}

/**
 Example usage:
 const api = createApiClient((method, url, params) =>
   fetch(url, { method, body: JSON.stringify(params) }).then((res) => res.json()),
 );
 api.get("/users").then((users) => console.log(users));
 api.post("/users", { body: { name: "John" } }).then((user) => console.log(user));
 api.put("/users/:id", { path: { id: 1 }, body: { name: "John" } }).then((user) => console.log(user));
*/

// </ApiClient
