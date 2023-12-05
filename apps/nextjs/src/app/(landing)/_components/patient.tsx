"use client";

import Link from "next/link";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { Button } from "@acme/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@acme/ui/card";

import { api } from "~/trpc/react";

export const patientIdAtom = atomWithStorage(
  "patientId",
  "e7836251cbed4bd5bb2d792bc02893fd",
);

export function Patient() {
  const [patientId] = useAtom(patientIdAtom);

  const { data, isLoading, isError, error } = api.canvas.getPatient.useQuery({
    path: {
      patient_id: patientId,
    },
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data?.name?.[0]?.family ?? ""}</CardTitle>
      </CardHeader>
      <CardContent>
        <Link href={`patient/${data.id}`}>
          <Button>View Patient</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
