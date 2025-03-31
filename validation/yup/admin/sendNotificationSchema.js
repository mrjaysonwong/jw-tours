import * as yup from 'yup';

import { userIdSchema } from '../user/personalDetailsSchema';

const notificationType = ['', 'email', 'sms', 'push'];
const template = [
  '',
  'survey',
  'promo',
  'update',
  'announcement',
  'newsletter',
];

const linkSchema = yup.object({
  link: yup
    .string()
    .trim()
    .required('Link is required')
    .max(2000, 'Link must not exceed 2000 characters')
    .matches(/^https:\/\//, 'Link must start with "https://"'),
});

export const sendNotificationSchema = yup.object().shape({
  userIds: userIdSchema.fields.userIds.notRequired(),
  notificationType: yup
    .string()
    .trim()
    .required('Notification type is required')
    .oneOf(notificationType, 'Invalid notification type'),
  template: yup
    .string()
    .trim()
    .required('Template is required')
    .oneOf(template, 'Invalid template'),
  link: linkSchema.fields.link.notRequired(),
  title: yup
    .string()
    .trim()
    .required('Title is required')
    .max(80, 'Title must not exceed 80 characters'),
  message: yup
    .string()
    .trim()
    .required('Message is required')
    .max(300, 'Message must not exceed of 300 characters'),
});
