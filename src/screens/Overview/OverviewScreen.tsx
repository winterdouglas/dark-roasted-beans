import React from "react";
import { useTranslation } from "react-i18next";
import { Screen } from "~components/Screen";

export const OverviewScreen = () => {
  const { t } = useTranslation("overview");
  return <Screen title={t("title")} subtitle={t("subtitle")} />;
};
