export enum DBOperation {
  create = 1,
  update = 2,
  delete = 3,
  escape = 4,
}

export enum DBControlState {
  new = 1,
  reset = 2,
}

export enum ResponseSnackbar {
  Sucess = 'Sucess',
  Error = 'Error',
  Pending = 'Pending',
}

export enum StatusValidate {
  VALID = "VALID",
  INVALID = "INVALID",  
}

export enum IYesNo {
  Yes = 'Yes',
  No = 'No',
}
export enum IActiveDead {
  Active = 'Active',
  Dead = 'Dead',
}

export enum statusConnect {
  successful = 200,
  error = 500,
}

export enum statusSubmit {
  valid = 'VALID',
  invalid = 'INVALID',
}

export enum Sort {
  asc = 'asc',
  desc = 'desc',
}

export enum TypeNotification {
  success = 'success',
  info = 'info',
  warning = 'warning',
  error = 'error',
}

export enum TypeActive {
  create = 'Thêm mới',
  edit = 'Cập nhật',
}

export enum Speaker {
  OPERATOR = 1,
  CUSTOMER = 2,
}

export enum Sentiment {
  Negative = -1,
  Neutral = 0,
  Positip = 1,
}

export enum Direction {
  incoming = 0,
  outgoing = 1,
}

export enum MetricType {
  SEARCH_KEYWORD = 'search',
  NAME_LOOP = 'name_loop',
  KEYWORD_PAIR = 'keyword_pair',
  SENTIMENT = 'sentiment',
}

export enum configMode {
  KEYWORD = 0,
  SENTIMENT = 1,
}

export enum StatusOrder {
  UNPAID = 'ChuaThanhToan',
  PAID = 'DaThanhToan',
  SHIPPED = 'DaGuiHang',
  FINISHED = 'DaHoanTat',
}
