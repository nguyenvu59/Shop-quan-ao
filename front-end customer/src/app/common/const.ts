export const messageConnectError = 'Có lỗi trong lúc kết nối';
export const messageAddSuccess = 'Thêm thành công';
export const messageUpdateSuccess = 'Cập nhật thành công';
export const messageDeleteSuccess = 'Xóa thành công';
export const messageErroDateTime =
  'Thời gian bắt đầu không được lớn hơn thời gian kết thúc';

export const defineValidate = {
  required: "Không được để trống",
  maxLength: "Không được nhập quá ",
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

export const listStatusOrder = [
  {
    name: 'Khởi tạo',
    id: 'KhoiTao',
  },
  {
    name: 'Xác nhận',
    id: 'XacNhan',
  },
  {
    name: 'Đang vận chuyển',
    id: 'DangVanChuyen',
  },
  {
    name: 'Đã hoàn tất',
    id: 'DaHoanTat',
  },
]

export const listStatusPay = [
  {
    name: 'Chưa Thanh Toán',
    id: 'ChuaThanhToan',
  },
  {
    name: 'Đã Thanh Toán',
    id: 'DaThanhToan',
  },
]

export const listSize = [
  'S', 'M', 'L', 'XL'
]

import {
  AccountBookTwoTone,
  AccountBookFill,
  AccountBookOutline,
  AlertTwoTone,
  AlertFill,
  AlibabaOutline,
  AimOutline,
  AlipayCircleFill,
  AlertOutline,
  AlignCenterOutline,
  AlipayCircleOutline,
  AlipayOutline,
  AlignLeftOutline,
  AlignRightOutline,
  AmazonOutline,
  AliwangwangOutline,
  AliyunOutline,
  AlipaySquareFill,
  AmazonCircleFill,
  AndroidFill,
  AliwangwangFill,
  AntCloudOutline,
  AmazonSquareFill,
  AndroidOutline,
  ApartmentOutline,
  ApiTwoTone,
  ApiFill,
  ApiOutline,
  AntDesignOutline,
  AppstoreAddOutline,
  AppstoreFill,
  AppleOutline,
  AppstoreOutline,
  ArrowDownOutline,
  AppleFill,
  ArrowsAltOutline,
  AppstoreTwoTone,
  ArrowUpOutline,
  AreaChartOutline,
  ArrowLeftOutline,
  AudioFill,
  ArrowRightOutline,
  AudioTwoTone,
  AuditOutline,
  AudioMutedOutline,
  BackwardFill,
  AudioOutline,
  BackwardOutline,
  BankFill,
  BarcodeOutline,
  BellFill,
  BankTwoTone,
  BarsOutline,
  BankOutline,
  BehanceCircleFill,
  BehanceSquareFill,
  BoldOutline,
  BellOutline,
  BehanceOutline,
  BlockOutline,
  BehanceSquareOutline,
  BgColorsOutline,
  BellTwoTone,
  BarChartOutline,
  BookTwoTone,
  BookFill,
  BorderOuterOutline,
  BorderLeftOutline,
  BorderBottomOutline,
  BorderHorizontalOutline,
  BorderTopOutline,
  BorderOutline,
  BorderInnerOutline,
  BorderRightOutline,
  BoxPlotOutline,
  BoxPlotFill,
  BoxPlotTwoTone,
  BookOutline,
  BorderlessTableOutline,
  BorderVerticleOutline,
  BuildTwoTone,
  BuildOutline,
  BugFill,
  BugOutline,
  BugTwoTone,
  BulbFill,
  BulbTwoTone,
  BuildFill,
  BulbOutline,
  CalculatorFill,
  CalculatorTwoTone,
  CalendarFill,
  CalendarOutline,
  CalculatorOutline,
  CalendarTwoTone,
  CameraOutline,
  CameraFill,
  CameraTwoTone,
  CarTwoTone,
  CaretDownOutline,
  CarOutline,
  CaretLeftFill,
  CarFill,
  CaretRightOutline,
  CaretDownFill,
  CaretUpOutline,
  CaretRightFill,
  CarryOutFill,
  CarryOutOutline,
  CaretLeftOutline,
  CaretUpFill,
  BranchesOutline,
  CarryOutTwoTone,
  CheckCircleFill,
  CheckCircleOutline,
  CheckSquareOutline,
  CheckCircleTwoTone,
  CiCircleTwoTone,
  CheckOutline,
  CheckSquareTwoTone,
  CiOutline,
  CheckSquareFill,
  CiTwoTone,
  ChromeOutline,
  ClockCircleOutline,
  CiCircleOutline,
  ChromeFill,
  ClearOutline,
  CloseCircleTwoTone,
  CiCircleFill,
  CloseCircleOutline,
  ClockCircleFill,
  CloseCircleFill,
  ClockCircleTwoTone,
  CloseOutline,
  CloseSquareOutline,
  CloseSquareFill,
  CloudFill,
  CloseSquareTwoTone,
  CloudDownloadOutline,
  CloudTwoTone,
  CloudServerOutline,
  CloudUploadOutline,
  CloudSyncOutline,
  ClusterOutline,
  CodeSandboxCircleFill,
  CodeFill,
  CodepenCircleOutline,
  CloudOutline,
  CodeSandboxOutline,
  CodeOutline,
  CodeSandboxSquareFill,
  CodeTwoTone,
  CodepenSquareFill,
  CodepenOutline,
  CoffeeOutline,
  ColumnWidthOutline,
  CompressOutline,
  ColumnHeightOutline,
  CodepenCircleFill,
  CompassTwoTone,
  CommentOutline,
  ContainerFill,
  CompassOutline,
  ConsoleSqlOutline,
  ContactsOutline,
  ContainerTwoTone,
  ContactsFill,
  ContactsTwoTone,
  ContainerOutline,
  ControlFill,
  CopyFill,
  CopyOutline,
  CompassFill,
  CopyTwoTone,
  CopyrightOutline,
  CopyrightCircleOutline,
  ControlTwoTone,
  ControlOutline,
  CreditCardFill,
  CopyrightTwoTone,
  CrownFill,
  CopyrightCircleFill,
  CrownOutline,
  CustomerServiceTwoTone,
  CreditCardOutline,
  CustomerServiceOutline,
  DashboardTwoTone,
  CrownTwoTone,
  CreditCardTwoTone,
  CustomerServiceFill,
  DashboardFill,
  DashOutline,
  DatabaseOutline,
  DatabaseTwoTone,
  DatabaseFill,
  DashboardOutline,
  DeleteTwoTone,
  DeleteRowOutline,
  DeleteColumnOutline,
  DeliveredProcedureOutline,
  DeleteOutline,
  CopyrightCircleTwoTone,
  DesktopOutline,
  DeleteFill,
  DiffOutline,
  DiffFill,
  DeploymentUnitOutline,
  DiffTwoTone,
  DingtalkOutline,
  DollarCircleFill,
  DislikeFill,
  DingtalkSquareFill,
  DisconnectOutline,
  DollarCircleTwoTone,
  DollarOutline,
  DingtalkCircleFill,
  DislikeTwoTone,
  DollarTwoTone,
  DownCircleFill,
  DislikeOutline,
  DollarCircleOutline,
  DoubleLeftOutline,
  DownSquareFill,
  DownOutline,
  DownSquareOutline,
  DownSquareTwoTone,
  DownCircleTwoTone,
  DoubleRightOutline,
  DownCircleOutline,
  DownloadOutline,
  DotChartOutline,
  DribbbleCircleFill,
  DribbbleOutline,
  DribbbleSquareOutline,
  DropboxCircleFill,
  DingdingOutline,
  EditOutline,
  DribbbleSquareFill,
  DropboxSquareFill,
  EllipsisOutline,
  EnvironmentFill,
  EditFill,
  EnterOutline,
  EuroCircleFill,
  EuroTwoTone,
  EuroCircleOutline,
  EditTwoTone,
  EuroOutline,
  EnvironmentTwoTone,
  ExclamationCircleFill,
  ExpandAltOutline,
  EuroCircleTwoTone,
  ExclamationCircleTwoTone,
  EnvironmentOutline,
  ExperimentOutline,
  ExperimentFill,
  ExpandOutline,
  ExceptionOutline,
  ExportOutline,
  ExperimentTwoTone,
  ExclamationCircleOutline,
  ExclamationOutline,
  EyeFill,
  EyeInvisibleFill,
  EyeInvisibleTwoTone,
  DropboxOutline,
  DragOutline,
  FacebookOutline,
  FacebookFill,
  EyeTwoTone,
  EyeOutline,
  FastForwardFill,
  FieldBinaryOutline,
  FieldNumberOutline,
  FastBackwardOutline,
  FileAddFill,
  FastBackwardFill,
  FileExcelFill,
  FastForwardOutline,
  FieldStringOutline,
  FileDoneOutline,
  FileAddTwoTone,
  FileExcelTwoTone,
  FileExclamationFill,
  FileAddOutline,
  FileExclamationOutline,
  FieldTimeOutline,
  FileImageTwoTone,
  FileExcelOutline,
  FileExclamationTwoTone,
  FileImageFill,
  FileGifOutline,
  FileFill,
  FileMarkdownTwoTone,
  FileMarkdownOutline,
  FallOutline,
  FileImageOutline,
  EyeInvisibleOutline,
  FilePdfOutline,
  FileSearchOutline,
  FilePptTwoTone,
  FilePdfTwoTone,
  FileJpgOutline,
  FileTextFill,
  FilePptOutline,
  FileSyncOutline,
  FilePptFill,
  FileUnknownOutline,
  FileProtectOutline,
  FileTextTwoTone,
  FileWordFill,
  FileUnknownTwoTone,
  FileWordTwoTone,
  FileUnknownFill,
  FileTextOutline,
  FileZipFill,
  FilterTwoTone,
  FilterFill,
  FileWordOutline,
  FireOutline,
  FireTwoTone,
  FileZipOutline,
  FilterOutline,
  FlagTwoTone,
  FileTwoTone,
  FilePdfFill,
  FileOutline,
  FileMarkdownFill,
  FileZipTwoTone,
  FlagOutline,
  FolderAddTwoTone,
  FolderOpenFill,
  FireFill,
  FlagFill,
  FolderOutline,
  FolderViewOutline,
  FolderTwoTone,
  FontColorsOutline,
  FolderOpenTwoTone,
  FolderFill,
  ForwardOutline,
  FolderOpenOutline,
  ForkOutline,
  ForwardFill,
  FormatPainterOutline,
  FormatPainterFill,
  FormOutline,
  FrownFill,
  FrownTwoTone,
  FullscreenOutline,
  FontSizeOutline,
  FundFill,
  FunctionOutline,
  FundViewOutline,
  FullscreenExitOutline,
  GifOutline,
  FundProjectionScreenOutline,
  FundTwoTone,
  FolderAddFill,
  FunnelPlotTwoTone,
  GiftOutline,
  FunnelPlotFill,
  FundOutline,
  FrownOutline,
  GithubOutline,
  GoldFill,
  FolderAddOutline,
  GitlabFill,
  GiftFill,
  GitlabOutline,
  GoldTwoTone,
  GoogleCircleFill,
  GiftTwoTone,
  GooglePlusCircleFill,
  GoldOutline,
  GithubFill,
  GoogleOutline,
  GooglePlusOutline,
  GoogleSquareFill,
  GoldenFill,
  HddTwoTone,
  GooglePlusSquareFill,
  GlobalOutline,
  HeartOutline,
  HeartTwoTone,
  GroupOutline,
  HeartFill,
  HeatMapOutline,
  GatewayOutline,
  FunnelPlotOutline,
  HddFill,
  HomeFill,
  HighlightFill,
  HomeOutline,
  HistoryOutline,
  HighlightOutline,
  HddOutline,
  HourglassFill,
  HomeTwoTone,
  HourglassTwoTone,
  Html5Outline,
  Html5Fill,
  IdcardFill,
  Html5TwoTone,
  HourglassOutline,
  IdcardTwoTone,
  IdcardOutline,
  IeOutline,
  IeCircleFill,
  IeSquareFill,
  InboxOutline,
  ImportOutline,
  InfoCircleOutline,
  InfoCircleTwoTone,
  InsertRowAboveOutline,
  InsertRowRightOutline,
  InfoCircleFill,
  InfoOutline,
  InsertRowBelowOutline,
  HighlightTwoTone,
  InsuranceFill,
  InstagramFill,
  InteractionFill,
  InsertRowLeftOutline,
  InstagramOutline,
  InteractionOutline,
  ItalicOutline,
  InteractionTwoTone,
  LayoutOutline,
  IssuesCloseOutline,
  LayoutFill,
  LaptopOutline,
  LeftCircleFill,
  LayoutTwoTone,
  KeyOutline,
  LeftOutline,
  LeftCircleOutline,
  LeftSquareOutline,
  LeftSquareFill,
  LeftCircleTwoTone,
  LikeFill,
  LeftSquareTwoTone,
  LineOutline,
  LikeTwoTone,
  LinkedinOutline,
  LineChartOutline,
  LineHeightOutline,
  LinkedinFill,
  LinkOutline,
  LikeOutline,
  InsuranceOutline,
  Loading3QuartersOutline,
  LockFill,
  InsuranceTwoTone,
  MacCommandOutline,
  LockTwoTone,
  LoadingOutline,
  MailOutline,
  LoginOutline,
  MedicineBoxOutline,
  MailFill,
  MailTwoTone,
  MacCommandFill,
  ManOutline,
  MedicineBoxFill,
  MedicineBoxTwoTone,
  MediumCircleFill,
  MediumOutline,
  MehFill,
  MediumWorkmarkOutline,
  MenuFoldOutline,
  MehOutline,
  MediumSquareFill,
  MessageTwoTone,
  MehTwoTone,
  MergeCellsOutline,
  MinusCircleFill,
  MenuOutline,
  MenuUnfoldOutline,
  MessageFill,
  MinusCircleTwoTone,
  LockOutline,
  MinusOutline,
  MinusCircleOutline,
  LogoutOutline,
  MessageOutline,
  MoneyCollectFill,
  MinusSquareOutline,
  MinusSquareTwoTone,
  MobileOutline,
  MobileTwoTone,
  MoneyCollectOutline,
  MoreOutline,
  NotificationFill,
  NotificationOutline,
  MoneyCollectTwoTone,
  NodeIndexOutline,
  NodeExpandOutline,
  MonitorOutline,
  OrderedListOutline,
  NodeCollapseOutline,
  NumberOutline,
  PaperClipOutline,
  NotificationTwoTone,
  PauseCircleFill,
  PartitionOutline,
  PauseOutline,
  OneToOneOutline,
  PayCircleOutline,
  PayCircleFill,
  MinusSquareFill,
  PauseCircleOutline,
  PauseCircleTwoTone,
  PicCenterOutline,
  PicRightOutline,
  PercentageOutline,
  MobileFill,
  PictureOutline,
  PictureFill,
  PhoneTwoTone,
  PhoneFill,
  PieChartFill,
  PictureTwoTone,
  PieChartOutline,
  PlaySquareFill,
  PlayCircleTwoTone,
  PlayCircleFill,
  PlusCircleFill,
  PlaySquareTwoTone,
  PlaySquareOutline,
  PlayCircleOutline,
  PieChartTwoTone,
  PlusCircleOutline,
  PlusSquareFill,
  PoundCircleFill,
  PlusSquareOutline,
  PlusOutline,
  PoundOutline,
  PoundCircleOutline,
  PlusSquareTwoTone,
  PlusCircleTwoTone,
  PoweroffOutline,
  PoundCircleTwoTone,
  PhoneOutline,
  PrinterFill,
  PicLeftOutline,
  ProjectTwoTone,
  PrinterOutline,
  ProjectFill,
  ProfileOutline,
  ProfileTwoTone,
  ProjectOutline,
  PropertySafetyFill,
  PullRequestOutline,
  PropertySafetyOutline,
  PushpinOutline,
  PushpinTwoTone,
  PropertySafetyTwoTone,
  PushpinFill,
  QqOutline,
  QqCircleFill,
  QrcodeOutline,
  QqSquareFill,
  QuestionCircleTwoTone,
  QuestionCircleFill,
  RadarChartOutline,
  RadiusUprightOutline,
  QuestionCircleOutline,
  QuestionOutline,
  ReadFill,
  RadiusUpleftOutline,
  RadiusBottomleftOutline,
  RadiusSettingOutline,
  RadiusBottomrightOutline,
  ProfileFill,
  PrinterTwoTone,
  ReadOutline,
  ReconciliationFill,
  ReloadOutline,
  ReconciliationOutline,
  RedEnvelopeTwoTone,
  RedditCircleFill,
  RedoOutline,
  RedEnvelopeFill,
  RedditOutline,
  RestTwoTone,
  RightCircleOutline,
  RestOutline,
  RedditSquareFill,
  RestFill,
  RightCircleTwoTone,
  RightOutline,
  RightSquareFill,
  RightCircleFill,
  RightSquareOutline,
  RetweetOutline,
  RiseOutline,
  RightSquareTwoTone,
  RobotFill,
  RocketOutline,
  RobotOutline,
  RocketTwoTone,
  RocketFill,
  RedEnvelopeOutline,
  RollbackOutline,
  RotateRightOutline,
  RotateLeftOutline,
  ReconciliationTwoTone,
  SafetyCertificateTwoTone,
  SaveOutline,
  SafetyOutline,
  SaveFill,
  SaveTwoTone,
  ScheduleFill,
  SafetyCertificateOutline,
  ScanOutline,
  ScheduleTwoTone,
  SearchOutline,
  ScheduleOutline,
  SecurityScanTwoTone,
  SecurityScanOutline,
  ScissorOutline,
  SelectOutline,
  SecurityScanFill,
  SendOutline,
  SettingOutline,
  SettingTwoTone,
  SettingFill,
  ShareAltOutline,
  ShopOutline,
  ShopFill,
  ShopTwoTone,
  ShrinkOutline,
  ShakeOutline,
  ShoppingOutline,
  ShoppingCartOutline,
  ShoppingFill,
  SisternodeOutline,
  ShoppingTwoTone,
  SafetyCertificateFill,
  SkinOutline,
  SignalFill,
  SketchOutline,
  SkinTwoTone,
  SketchSquareFill,
  SkypeFill,
  SkinFill,
  SlackCircleFill,
  SlackSquareFill,
  SlidersTwoTone,
  SkypeOutline,
  SlidersFill,
  SlackSquareOutline,
  SmallDashOutline,
  SmileTwoTone,
  SlidersOutline,
  SnippetsFill,
  SnippetsOutline,
  SmileOutline,
  SolutionOutline,
  SlackOutline,
  SnippetsTwoTone,
  SoundTwoTone,
  SortAscendingOutline,
  SoundFill,
  SortDescendingOutline,
  SmileFill,
  SoundOutline,
  SplitCellsOutline,
  SketchCircleFill,
  StarOutline,
  StockOutline,
  StarTwoTone,
  StepForwardFill,
  StarFill,
  StepBackwardFill,
  StepForwardOutline,
  StopFill,
  SubnodeOutline,
  SwapLeftOutline,
  StopOutline,
  StopTwoTone,
  SwapRightOutline,
  SwapOutline,
  SwitcherTwoTone,
  SwitcherOutline,
  SyncOutline,
  StrikethroughOutline,
  SwitcherFill,
  TagOutline,
  TabletTwoTone,
  TabletOutline,
  TabletFill,
  TableOutline,
  TagsFill,
  TagFill,
  TagsTwoTone,
  TaobaoCircleOutline,
  StepBackwardOutline,
  TagsOutline,
  TagTwoTone,
  TaobaoOutline,
  ThunderboltOutline,
  TaobaoSquareFill,
  TeamOutline,
  TaobaoCircleFill,
  ThunderboltTwoTone,
  ToolFill,
  ThunderboltFill,
  ToTopOutline,
  ToolOutline,
  ToolTwoTone,
  TrademarkCircleFill,
  TrophyFill,
  TrademarkCircleTwoTone,
  TransactionOutline,
  TrademarkCircleOutline,
  TranslationOutline,
  TwitterCircleFill,
  TrophyOutline,
  TrademarkOutline,
  TrophyTwoTone,
  TwitterSquareFill,
  UnlockFill,
  TwitterOutline,
  UnderlineOutline,
  UndoOutline,
  UpCircleFill,
  UngroupOutline,
  UnlockTwoTone,
  UnlockOutline,
  UpOutline,
  UsbFill,
  UpCircleOutline,
  UnorderedListOutline,
  UpCircleTwoTone,
  UpSquareFill,
  UpSquareOutline,
  UserAddOutline,
  UsbTwoTone,
  UsergroupDeleteOutline,
  UpSquareTwoTone,
  UserOutline,
  UsbOutline,
  UserDeleteOutline,
  UserSwitchOutline,
  VerticalLeftOutline,
  VerticalAlignBottomOutline,
  VerifiedOutline,
  UsergroupAddOutline,
  UploadOutline,
  VerticalAlignMiddleOutline,
  VerticalAlignTopOutline,
  VerticalRightOutline,
  VideoCameraOutline,
  VideoCameraAddOutline,
  VideoCameraTwoTone,
  VideoCameraFill,
  WalletOutline,
  WalletFill,
  WarningFill,
  WarningOutline,
  WechatOutline,
  WalletTwoTone,
  WeiboCircleFill,
  WarningTwoTone,
  WeiboSquareFill,
  WeiboOutline,
  WeiboSquareOutline,
  WeiboCircleOutline,
  WechatFill,
  WhatsAppOutline,
  WifiOutline,
  WomanOutline,
  YoutubeFill,
  YahooOutline,
  WindowsFill,
  WindowsOutline,
  YoutubeOutline,
  YuqueOutline,
  ZhihuCircleFill,
  YuqueFill,
  ZhihuOutline,
  ZhihuSquareFill,
  ZoomInOutline,
  ZoomOutOutline,
  YahooFill,
} from '@ant-design/icons-angular/icons';

import { IconDefinition } from '@ant-design/icons-angular';

export const icons: IconDefinition[] = [
  AccountBookTwoTone,
  AccountBookFill,
  AccountBookOutline,
  AlertTwoTone,
  AlertFill,
  AlibabaOutline,
  AimOutline,
  AlipayCircleFill,
  AlertOutline,
  AlignCenterOutline,
  AlipayCircleOutline,
  AlipayOutline,
  AlignLeftOutline,
  AlignRightOutline,
  AmazonOutline,
  AliwangwangOutline,
  AliyunOutline,
  AlipaySquareFill,
  AmazonCircleFill,
  AndroidFill,
  AliwangwangFill,
  AntCloudOutline,
  AmazonSquareFill,
  AndroidOutline,
  ApartmentOutline,
  ApiTwoTone,
  ApiFill,
  ApiOutline,
  AntDesignOutline,
  AppstoreAddOutline,
  AppstoreFill,
  AppleOutline,
  AppstoreOutline,
  ArrowDownOutline,
  AppleFill,
  ArrowsAltOutline,
  AppstoreTwoTone,
  ArrowUpOutline,
  AreaChartOutline,
  ArrowLeftOutline,
  AudioFill,
  ArrowRightOutline,
  AudioTwoTone,
  AuditOutline,
  AudioMutedOutline,
  BackwardFill,
  AudioOutline,
  BackwardOutline,
  BankFill,
  BarcodeOutline,
  BellFill,
  BankTwoTone,
  BarsOutline,
  BankOutline,
  BehanceCircleFill,
  BehanceSquareFill,
  BoldOutline,
  BellOutline,
  BehanceOutline,
  BlockOutline,
  BehanceSquareOutline,
  BgColorsOutline,
  BellTwoTone,
  BarChartOutline,
  BookTwoTone,
  BookFill,
  BorderOuterOutline,
  BorderLeftOutline,
  BorderBottomOutline,
  BorderHorizontalOutline,
  BorderTopOutline,
  BorderOutline,
  BorderInnerOutline,
  BorderRightOutline,
  BoxPlotOutline,
  BoxPlotFill,
  BoxPlotTwoTone,
  BookOutline,
  BorderlessTableOutline,
  BorderVerticleOutline,
  BuildTwoTone,
  BuildOutline,
  BugFill,
  BugOutline,
  BugTwoTone,
  BulbFill,
  BulbTwoTone,
  BuildFill,
  BulbOutline,
  CalculatorFill,
  CalculatorTwoTone,
  CalendarFill,
  CalendarOutline,
  CalculatorOutline,
  CalendarTwoTone,
  CameraOutline,
  CameraFill,
  CameraTwoTone,
  CarTwoTone,
  CaretDownOutline,
  CarOutline,
  CaretLeftFill,
  CarFill,
  CaretRightOutline,
  CaretDownFill,
  CaretUpOutline,
  CaretRightFill,
  CarryOutFill,
  CarryOutOutline,
  CaretLeftOutline,
  CaretUpFill,
  BranchesOutline,
  CarryOutTwoTone,
  CheckCircleFill,
  CheckCircleOutline,
  CheckSquareOutline,
  CheckCircleTwoTone,
  CiCircleTwoTone,
  CheckOutline,
  CheckSquareTwoTone,
  CiOutline,
  CheckSquareFill,
  CiTwoTone,
  ChromeOutline,
  ClockCircleOutline,
  CiCircleOutline,
  ChromeFill,
  ClearOutline,
  CloseCircleTwoTone,
  CiCircleFill,
  CloseCircleOutline,
  ClockCircleFill,
  CloseCircleFill,
  ClockCircleTwoTone,
  CloseOutline,
  CloseSquareOutline,
  CloseSquareFill,
  CloudFill,
  CloseSquareTwoTone,
  CloudDownloadOutline,
  CloudTwoTone,
  CloudServerOutline,
  CloudUploadOutline,
  CloudSyncOutline,
  ClusterOutline,
  CodeSandboxCircleFill,
  CodeFill,
  CodepenCircleOutline,
  CloudOutline,
  CodeSandboxOutline,
  CodeOutline,
  CodeSandboxSquareFill,
  CodeTwoTone,
  CodepenSquareFill,
  CodepenOutline,
  CoffeeOutline,
  ColumnWidthOutline,
  CompressOutline,
  ColumnHeightOutline,
  CodepenCircleFill,
  CompassTwoTone,
  CommentOutline,
  ContainerFill,
  CompassOutline,
  ConsoleSqlOutline,
  ContactsOutline,
  ContainerTwoTone,
  ContactsFill,
  ContactsTwoTone,
  ContainerOutline,
  ControlFill,
  CopyFill,
  CopyOutline,
  CompassFill,
  CopyTwoTone,
  CopyrightOutline,
  CopyrightCircleOutline,
  ControlTwoTone,
  ControlOutline,
  CreditCardFill,
  CopyrightTwoTone,
  CrownFill,
  CopyrightCircleFill,
  CrownOutline,
  CustomerServiceTwoTone,
  CreditCardOutline,
  CustomerServiceOutline,
  DashboardTwoTone,
  CrownTwoTone,
  CreditCardTwoTone,
  CustomerServiceFill,
  DashboardFill,
  DashOutline,
  DatabaseOutline,
  DatabaseTwoTone,
  DatabaseFill,
  DashboardOutline,
  DeleteTwoTone,
  DeleteRowOutline,
  DeleteColumnOutline,
  DeliveredProcedureOutline,
  DeleteOutline,
  CopyrightCircleTwoTone,
  DesktopOutline,
  DeleteFill,
  DiffOutline,
  DiffFill,
  DeploymentUnitOutline,
  DiffTwoTone,
  DingtalkOutline,
  DollarCircleFill,
  DislikeFill,
  DingtalkSquareFill,
  DisconnectOutline,
  DollarCircleTwoTone,
  DollarOutline,
  DingtalkCircleFill,
  DislikeTwoTone,
  DollarTwoTone,
  DownCircleFill,
  DislikeOutline,
  DollarCircleOutline,
  DoubleLeftOutline,
  DownSquareFill,
  DownOutline,
  DownSquareOutline,
  DownSquareTwoTone,
  DownCircleTwoTone,
  DoubleRightOutline,
  DownCircleOutline,
  DownloadOutline,
  DotChartOutline,
  DribbbleCircleFill,
  DribbbleOutline,
  DribbbleSquareOutline,
  DropboxCircleFill,
  DingdingOutline,
  EditOutline,
  DribbbleSquareFill,
  DropboxSquareFill,
  EllipsisOutline,
  EnvironmentFill,
  EditFill,
  EnterOutline,
  EuroCircleFill,
  EuroTwoTone,
  EuroCircleOutline,
  EditTwoTone,
  EuroOutline,
  EnvironmentTwoTone,
  ExclamationCircleFill,
  ExpandAltOutline,
  EuroCircleTwoTone,
  ExclamationCircleTwoTone,
  EnvironmentOutline,
  ExperimentOutline,
  ExperimentFill,
  ExpandOutline,
  ExceptionOutline,
  ExportOutline,
  ExperimentTwoTone,
  ExclamationCircleOutline,
  ExclamationOutline,
  EyeFill,
  EyeInvisibleFill,
  EyeInvisibleTwoTone,
  DropboxOutline,
  DragOutline,
  FacebookOutline,
  FacebookFill,
  EyeTwoTone,
  EyeOutline,
  FastForwardFill,
  FieldBinaryOutline,
  FieldNumberOutline,
  FastBackwardOutline,
  FileAddFill,
  FastBackwardFill,
  FileExcelFill,
  FastForwardOutline,
  FieldStringOutline,
  FileDoneOutline,
  FileAddTwoTone,
  FileExcelTwoTone,
  FileExclamationFill,
  FileAddOutline,
  FileExclamationOutline,
  FieldTimeOutline,
  FileImageTwoTone,
  FileExcelOutline,
  FileExclamationTwoTone,
  FileImageFill,
  FileGifOutline,
  FileFill,
  FileMarkdownTwoTone,
  FileMarkdownOutline,
  FallOutline,
  FileImageOutline,
  EyeInvisibleOutline,
  FilePdfOutline,
  FileSearchOutline,
  FilePptTwoTone,
  FilePdfTwoTone,
  FileJpgOutline,
  FileTextFill,
  FilePptOutline,
  FileSyncOutline,
  FilePptFill,
  FileUnknownOutline,
  FileProtectOutline,
  FileTextTwoTone,
  FileWordFill,
  FileUnknownTwoTone,
  FileWordTwoTone,
  FileUnknownFill,
  FileTextOutline,
  FileZipFill,
  FilterTwoTone,
  FilterFill,
  FileWordOutline,
  FireOutline,
  FireTwoTone,
  FileZipOutline,
  FilterOutline,
  FlagTwoTone,
  FileTwoTone,
  FilePdfFill,
  FileOutline,
  FileMarkdownFill,
  FileZipTwoTone,
  FlagOutline,
  FolderAddTwoTone,
  FolderOpenFill,
  FireFill,
  FlagFill,
  FolderOutline,
  FolderViewOutline,
  FolderTwoTone,
  FontColorsOutline,
  FolderOpenTwoTone,
  FolderFill,
  ForwardOutline,
  FolderOpenOutline,
  ForkOutline,
  ForwardFill,
  FormatPainterOutline,
  FormatPainterFill,
  FormOutline,
  FrownFill,
  FrownTwoTone,
  FullscreenOutline,
  FontSizeOutline,
  FundFill,
  FunctionOutline,
  FundViewOutline,
  FullscreenExitOutline,
  GifOutline,
  FundProjectionScreenOutline,
  FundTwoTone,
  FolderAddFill,
  FunnelPlotTwoTone,
  GiftOutline,
  FunnelPlotFill,
  FundOutline,
  FrownOutline,
  GithubOutline,
  GoldFill,
  FolderAddOutline,
  GitlabFill,
  GiftFill,
  GitlabOutline,
  GoldTwoTone,
  GoogleCircleFill,
  GiftTwoTone,
  GooglePlusCircleFill,
  GoldOutline,
  GithubFill,
  GoogleOutline,
  GooglePlusOutline,
  GoogleSquareFill,
  GoldenFill,
  HddTwoTone,
  GooglePlusSquareFill,
  GlobalOutline,
  HeartOutline,
  HeartTwoTone,
  GroupOutline,
  HeartFill,
  HeatMapOutline,
  GatewayOutline,
  FunnelPlotOutline,
  HddFill,
  HomeFill,
  HighlightFill,
  HomeOutline,
  HistoryOutline,
  HighlightOutline,
  HddOutline,
  HourglassFill,
  HomeTwoTone,
  HourglassTwoTone,
  Html5Outline,
  Html5Fill,
  IdcardFill,
  Html5TwoTone,
  HourglassOutline,
  IdcardTwoTone,
  IdcardOutline,
  IeOutline,
  IeCircleFill,
  IeSquareFill,
  InboxOutline,
  ImportOutline,
  InfoCircleOutline,
  InfoCircleTwoTone,
  InsertRowAboveOutline,
  InsertRowRightOutline,
  InfoCircleFill,
  InfoOutline,
  InsertRowBelowOutline,
  HighlightTwoTone,
  InsuranceFill,
  InstagramFill,
  InteractionFill,
  InsertRowLeftOutline,
  InstagramOutline,
  InteractionOutline,
  ItalicOutline,
  InteractionTwoTone,
  LayoutOutline,
  IssuesCloseOutline,
  LayoutFill,
  LaptopOutline,
  LeftCircleFill,
  LayoutTwoTone,
  KeyOutline,
  LeftOutline,
  LeftCircleOutline,
  LeftSquareOutline,
  LeftSquareFill,
  LeftCircleTwoTone,
  LikeFill,
  LeftSquareTwoTone,
  LineOutline,
  LikeTwoTone,
  LinkedinOutline,
  LineChartOutline,
  LineHeightOutline,
  LinkedinFill,
  LinkOutline,
  LikeOutline,
  InsuranceOutline,
  Loading3QuartersOutline,
  LockFill,
  InsuranceTwoTone,
  MacCommandOutline,
  LockTwoTone,
  LoadingOutline,
  MailOutline,
  LoginOutline,
  MedicineBoxOutline,
  MailFill,
  MailTwoTone,
  MacCommandFill,
  ManOutline,
  MedicineBoxFill,
  MedicineBoxTwoTone,
  MediumCircleFill,
  MediumOutline,
  MehFill,
  MediumWorkmarkOutline,
  MenuFoldOutline,
  MehOutline,
  MediumSquareFill,
  MessageTwoTone,
  MehTwoTone,
  MergeCellsOutline,
  MinusCircleFill,
  MenuOutline,
  MenuUnfoldOutline,
  MessageFill,
  MinusCircleTwoTone,
  LockOutline,
  MinusOutline,
  MinusCircleOutline,
  LogoutOutline,
  MessageOutline,
  MoneyCollectFill,
  MinusSquareOutline,
  MinusSquareTwoTone,
  MobileOutline,
  MobileTwoTone,
  MoneyCollectOutline,
  MoreOutline,
  NotificationFill,
  NotificationOutline,
  MoneyCollectTwoTone,
  NodeIndexOutline,
  NodeExpandOutline,
  MonitorOutline,
  OrderedListOutline,
  NodeCollapseOutline,
  NumberOutline,
  PaperClipOutline,
  NotificationTwoTone,
  PauseCircleFill,
  PartitionOutline,
  PauseOutline,
  OneToOneOutline,
  PayCircleOutline,
  PayCircleFill,
  MinusSquareFill,
  PauseCircleOutline,
  PauseCircleTwoTone,
  PicCenterOutline,
  PicRightOutline,
  PercentageOutline,
  MobileFill,
  PictureOutline,
  PictureFill,
  PhoneTwoTone,
  PhoneFill,
  PieChartFill,
  PictureTwoTone,
  PieChartOutline,
  PlaySquareFill,
  PlayCircleTwoTone,
  PlayCircleFill,
  PlusCircleFill,
  PlaySquareTwoTone,
  PlaySquareOutline,
  PlayCircleOutline,
  PieChartTwoTone,
  PlusCircleOutline,
  PlusSquareFill,
  PoundCircleFill,
  PlusSquareOutline,
  PlusOutline,
  PoundOutline,
  PoundCircleOutline,
  PlusSquareTwoTone,
  PlusCircleTwoTone,
  PoweroffOutline,
  PoundCircleTwoTone,
  PhoneOutline,
  PrinterFill,
  PicLeftOutline,
  ProjectTwoTone,
  PrinterOutline,
  ProjectFill,
  ProfileOutline,
  ProfileTwoTone,
  ProjectOutline,
  PropertySafetyFill,
  PullRequestOutline,
  PropertySafetyOutline,
  PushpinOutline,
  PushpinTwoTone,
  PropertySafetyTwoTone,
  PushpinFill,
  QqOutline,
  QqCircleFill,
  QrcodeOutline,
  QqSquareFill,
  QuestionCircleTwoTone,
  QuestionCircleFill,
  RadarChartOutline,
  RadiusUprightOutline,
  QuestionCircleOutline,
  QuestionOutline,
  ReadFill,
  RadiusUpleftOutline,
  RadiusBottomleftOutline,
  RadiusSettingOutline,
  RadiusBottomrightOutline,
  ProfileFill,
  PrinterTwoTone,
  ReadOutline,
  ReconciliationFill,
  ReloadOutline,
  ReconciliationOutline,
  RedEnvelopeTwoTone,
  RedditCircleFill,
  RedoOutline,
  RedEnvelopeFill,
  RedditOutline,
  RestTwoTone,
  RightCircleOutline,
  RestOutline,
  RedditSquareFill,
  RestFill,
  RightCircleTwoTone,
  RightOutline,
  RightSquareFill,
  RightCircleFill,
  RightSquareOutline,
  RetweetOutline,
  RiseOutline,
  RightSquareTwoTone,
  RobotFill,
  RocketOutline,
  RobotOutline,
  RocketTwoTone,
  RocketFill,
  RedEnvelopeOutline,
  RollbackOutline,
  RotateRightOutline,
  RotateLeftOutline,
  ReconciliationTwoTone,
  SafetyCertificateTwoTone,
  SaveOutline,
  SafetyOutline,
  SaveFill,
  SaveTwoTone,
  ScheduleFill,
  SafetyCertificateOutline,
  ScanOutline,
  ScheduleTwoTone,
  SearchOutline,
  ScheduleOutline,
  SecurityScanTwoTone,
  SecurityScanOutline,
  ScissorOutline,
  SelectOutline,
  SecurityScanFill,
  SendOutline,
  SettingOutline,
  SettingTwoTone,
  SettingFill,
  ShareAltOutline,
  ShopOutline,
  ShopFill,
  ShopTwoTone,
  ShrinkOutline,
  ShakeOutline,
  ShoppingOutline,
  ShoppingCartOutline,
  ShoppingFill,
  SisternodeOutline,
  ShoppingTwoTone,
  SafetyCertificateFill,
  SkinOutline,
  SignalFill,
  SketchOutline,
  SkinTwoTone,
  SketchSquareFill,
  SkypeFill,
  SkinFill,
  SlackCircleFill,
  SlackSquareFill,
  SlidersTwoTone,
  SkypeOutline,
  SlidersFill,
  SlackSquareOutline,
  SmallDashOutline,
  SmileTwoTone,
  SlidersOutline,
  SnippetsFill,
  SnippetsOutline,
  SmileOutline,
  SolutionOutline,
  SlackOutline,
  SnippetsTwoTone,
  SoundTwoTone,
  SortAscendingOutline,
  SoundFill,
  SortDescendingOutline,
  SmileFill,
  SoundOutline,
  SplitCellsOutline,
  SketchCircleFill,
  StarOutline,
  StockOutline,
  StarTwoTone,
  StepForwardFill,
  StarFill,
  StepBackwardFill,
  StepForwardOutline,
  StopFill,
  SubnodeOutline,
  SwapLeftOutline,
  StopOutline,
  StopTwoTone,
  SwapRightOutline,
  SwapOutline,
  SwitcherTwoTone,
  SwitcherOutline,
  SyncOutline,
  StrikethroughOutline,
  SwitcherFill,
  TagOutline,
  TabletTwoTone,
  TabletOutline,
  TabletFill,
  TableOutline,
  TagsFill,
  TagFill,
  TagsTwoTone,
  TaobaoCircleOutline,
  StepBackwardOutline,
  TagsOutline,
  TagTwoTone,
  TaobaoOutline,
  ThunderboltOutline,
  TaobaoSquareFill,
  TeamOutline,
  TaobaoCircleFill,
  ThunderboltTwoTone,
  ToolFill,
  ThunderboltFill,
  ToTopOutline,
  ToolOutline,
  ToolTwoTone,
  TrademarkCircleFill,
  TrophyFill,
  TrademarkCircleTwoTone,
  TransactionOutline,
  TrademarkCircleOutline,
  TranslationOutline,
  TwitterCircleFill,
  TrophyOutline,
  TrademarkOutline,
  TrophyTwoTone,
  TwitterSquareFill,
  UnlockFill,
  TwitterOutline,
  UnderlineOutline,
  UndoOutline,
  UpCircleFill,
  UngroupOutline,
  UnlockTwoTone,
  UnlockOutline,
  UpOutline,
  UsbFill,
  UpCircleOutline,
  UnorderedListOutline,
  UpCircleTwoTone,
  UpSquareFill,
  UpSquareOutline,
  UserAddOutline,
  UsbTwoTone,
  UsergroupDeleteOutline,
  UpSquareTwoTone,
  UserOutline,
  UsbOutline,
  UserDeleteOutline,
  UserSwitchOutline,
  VerticalLeftOutline,
  VerticalAlignBottomOutline,
  VerifiedOutline,
  UsergroupAddOutline,
  UploadOutline,
  VerticalAlignMiddleOutline,
  VerticalAlignTopOutline,
  VerticalRightOutline,
  VideoCameraOutline,
  VideoCameraAddOutline,
  VideoCameraTwoTone,
  VideoCameraFill,
  WalletOutline,
  WalletFill,
  WarningFill,
  WarningOutline,
  WechatOutline,
  WalletTwoTone,
  WeiboCircleFill,
  WarningTwoTone,
  WeiboSquareFill,
  WeiboOutline,
  WeiboSquareOutline,
  WeiboCircleOutline,
  WechatFill,
  WhatsAppOutline,
  WifiOutline,
  WomanOutline,
  YoutubeFill,
  YahooOutline,
  WindowsFill,
  WindowsOutline,
  YoutubeOutline,
  YuqueOutline,
  ZhihuCircleFill,
  YuqueFill,
  ZhihuOutline,
  ZhihuSquareFill,
  ZoomInOutline,
  ZoomOutOutline,
  YahooFill,
];
