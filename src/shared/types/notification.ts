import {ActionPayload} from "./action";

export enum NotificationType {
    Example = "notification-example",
}

export type NotificationPayload = {
    [NotificationType.Example]: void;
}

export type NotificationAction = ActionPayload<NotificationPayload>;
