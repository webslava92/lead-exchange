export type HttpResponse<T = any> = {
  status: number;
  data?: T;
};
export type ItemsKey = number | string;
export type ItemsEntry = Record<ItemsKey, string>;
export type ItemsGroup = Record<ItemsKey, ItemsEntry>;

export type FileType = { target: { files: any } };

export type UploadFileProps = {
  setItems: Function;
};
