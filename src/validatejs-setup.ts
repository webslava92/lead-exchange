import dayjs, { Dayjs } from 'dayjs';
import validate from 'validate.js';

validate.extend(validate.validators.datetime, {
  parse(value: Dayjs) {
    return value.valueOf();
  },
  format(value: number) {
    return dayjs(value).format('HH:mm:ss');
  },
});
