export const convertFirestoreTimestampToPlainObject = (data) => {
  if (data.timestampCreate) {
    data.timestampCreate = {
      seconds: data.timestampCreate.seconds,
      nanoseconds: data.timestampCreate.nanoseconds,
    };
  }

  if (data.timestampUpdate) {
    data.timestampUpdate = {
      seconds: data.timestampUpdate.seconds,
      nanoseconds: data.timestampUpdate.nanoseconds,
    };
  }
  return data;
};
