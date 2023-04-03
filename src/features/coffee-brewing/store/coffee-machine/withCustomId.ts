export type WithCustomId = {
  _id: string;
};

export const getId = ({ _id }: WithCustomId) => _id;
