export type TDraft = {
  draftKey: string;
};

export const isDraft = (arg: any): arg is TDraft => {
  if (!arg?.draftKey) {
    return false;
  }

  return typeof arg.draftKey === "string";
};
