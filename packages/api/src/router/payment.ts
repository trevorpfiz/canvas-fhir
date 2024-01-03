import {
  get_SearchPaymentnotice,
  post_CreatePaymentnotice,
} from "../canvas/canvas-client";
import { handleFhirApiResponse } from "../lib/utils";
import { createTRPCRouter, protectedCanvasProcedure } from "../trpc";

export const paymentRouter = createTRPCRouter({
  createPayment: protectedCanvasProcedure
    .input(post_CreatePaymentnotice.parameters)
    .mutation(async ({ ctx, input }) => {
      const { api } = ctx;

      // create /PaymentNotice
      const paymentData = await api.post("/PaymentNotice", {
        body: {
          status: "active",
          request: {
            reference: input.body.request?.reference,
          },
          created: new Date().toISOString(),
          payment: {},
          recipient: {},
          amount: {
            currency: "USD",
            value: input.body.amount?.value,
          },
        },
      });

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        paymentData,
        post_CreatePaymentnotice.response,
      );

      return validatedData;
    }),
  searchPayments: protectedCanvasProcedure
    .input(get_SearchPaymentnotice.parameters)
    .query(async ({ ctx, input }) => {
      const { api } = ctx;

      // search /PaymentNotice
      const paymentData = await api.get("/PaymentNotice", {
        query: {
          request: input.query.request,
        },
      });

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        paymentData,
        get_SearchPaymentnotice.response,
      );

      return validatedData;
    }),
});
