export const messageConnectError = 'Có lỗi trong lúc kết nối';
export const messageAddSuccess = 'Thêm thành công';
export const messageUpdateSuccess = 'Cập nhật thành công';
export const messageDeleteSuccess = 'Xóa thành công';
export const messageErroDateTime =
  'Thời gian bắt đầu không được lớn hơn thời gian kết thúc';

export const defineValidate = {
  required:"Không được để trống",
  maxLength:"Không được nhập quá ",
};

export const page = {
  totalPages: 0,
  totalItem: 0,
  size: 10,
  page: 1,
};

export const listDirection = [
  { name: 'Incoming', id: 0 },
  { name: 'Outgoing', id: 1 },
];

export const listMetricScoreType = [
  {
    name: 'Nhị phân',
    id: 1,
  },
  {
    name: 'Phạm vi',
    id: 2,
  },
];

export const listMetricTheme = [
  {
    name: 'Tiêu cực',
    id: -1,
  },
  {
    name: 'Tích cực',
    id: 1,
  },
];

export const listMetricType = [
  {
    name: 'Tìm kiếm từ khóa',
    id: 'search',
  },
  {
    name: 'Cảm xúc',
    id: 'sentiment',
  },
  {
    name: 'Nhắc lại tên',
    id: 'name_loop',
  },
  {
    name: 'Keyword pair',
    id: 'keyword_pair',
  },
];

export const listMetricCategory = [
  {
    name: 'Sự hài lòng của khách hàng',
    id: 'customer_satisfaction',
  },
  {
    name: 'Quy trình làm việc',
    id: 'process_checklist',
  },
  {
    name: 'Tùy biến',
    id: 'customize',
  },
];

export const listMetricSearchRange = [
  {
    name: 'Tất cả',
    id: 'all',
  },
  {
    name: 'N giây đầu',
    id: 'first_N_seconds',
  },
  {
    name: 'N giây cuối',
    id: 'last_N_seconds',
  },
];

export const listSentiment = [
  {
    name: 'Tiêu cực',
    id: -1,
  },
  {
    name: 'Trung Tính',
    id: 0,
  },
  {
    name: 'Tích cực',
    id: 1,
  },
];

export const listSpeaker = [
  {
    name: 'Nhân viên',
    id: 1,
  },
  {
    name: 'Khách hàng',
    id: 2,
  },
  {
    name: 'Cả hai',
    id: 3,
  },
];

export const pageConfig = {
  labels: {
    previousLabel: '',
    nextLabel: '',
    screenReaderPaginationLabel: '',
    screenReaderPageLabel: '',
    screenReaderCurrentLabel: `You're on page`,
  },
};

export const Sex = [
  { name: 'Nam', id: 'Nam' },
  { name: 'Nữ', id: 'Nu' },
];

export const Size = [
  { name: 'XS ', id: 'XS ' },
  { name: 'S', id: 'S' },
  { name: 'M', id: 'M' },
  { name: 'L', id: 'L' },
  { name: 'XL', id: 'XL' },
  { name: 'XXl', id: 'XXl' },
];
