export interface WebAppConfig {
  id: number;
  device_id: number;
  created_at: string;
  updated_at: string;
  assertion_log: number;
  beep_verbosity: number;
  bot_origin_quadrant: number;
  busy_log: number;
  confirm_plant_deletion: boolean;
  confirm_sequence_deletion: boolean;
  confirm_step_deletion: boolean;
  crop_images: boolean;
  clip_image_layer: boolean;
  debug_log: number;
  disable_animations: boolean;
  disable_emergency_unlock_confirmation: boolean;
  disable_i18n: boolean;
  discard_unsaved_sequences: boolean;
  discard_unsaved: boolean;
  display_map_missed_steps: boolean;
  display_trail: boolean;
  dynamic_map: boolean;
  enable_browser_speak: boolean;
  encoder_figure: boolean;
  error_log: number;
  expand_step_options: boolean;
  fun_log: number;
  go_button_axes: string;
  hide_sensors: boolean;
  hide_webcam_widget: boolean;
  highlight_modified_settings: boolean;
  home_button_homing: boolean;
  info_log: number;
  landing_page: string;
  legend_menu_open: boolean;
  map_size_x: number;
  map_size_y: number;
  photo_filter_begin: string;
  photo_filter_end: string;
  raw_encoders: boolean;
  scaled_encoders: boolean;
  show_advanced_settings: boolean;
  show_camera_view_area: boolean;
  show_farmbot: boolean;
  show_first_party_farmware: boolean;
  show_historic_points: boolean;
  show_images: boolean;
  show_motor_plot: boolean;
  show_pins: boolean;
  show_plants: boolean;
  show_points: boolean;
  show_soil_interpolation_map: boolean;
  show_sensor_readings: boolean;
  show_moisture_interpolation_map: boolean;
  show_spread: boolean;
  show_weeds: boolean;
  show_zones: boolean;
  stub_config: boolean;
  success_log: number;
  time_format_24_hour: boolean;
  time_format_seconds: boolean;
  user_interface_read_only_mode: boolean;
  view_celery_script: boolean;
  warn_log: number;
  x_axis_inverted: boolean;
  xy_swap: boolean;
  y_axis_inverted: boolean;
  z_axis_inverted: boolean;
  zoom_level: number;
}

export type NumberConfigKey =
  | "id"
  | "device_id"
  | "assertion_log"
  | "beep_verbosity"
  | "busy_log"
  | "debug_log"
  | "error_log"
  | "fun_log"
  | "info_log"
  | "success_log"
  | "warn_log"
  | "bot_origin_quadrant"
  | "map_size_x"
  | "map_size_y"
  | "zoom_level";

export type StringConfigKey =
  | "created_at"
  | "go_button_axes"
  | "landing_page"
  | "photo_filter_begin"
  | "photo_filter_end"
  | "updated_at";

export type BooleanConfigKey =
  | "confirm_plant_deletion"
  | "confirm_sequence_deletion"
  | "confirm_step_deletion"
  | "crop_images"
  | "clip_image_layer"
  | "disable_animations"
  | "disable_emergency_unlock_confirmation"
  | "disable_i18n"
  | "discard_unsaved_sequences"
  | "discard_unsaved"
  | "display_map_missed_steps"
  | "display_trail"
  | "dynamic_map"
  | "enable_browser_speak"
  | "encoder_figure"
  | "expand_step_options"
  | "hide_sensors"
  | "hide_webcam_widget"
  | "highlight_modified_settings"
  | "home_button_homing"
  | "legend_menu_open"
  | "raw_encoders"
  | "scaled_encoders"
  | "show_advanced_settings"
  | "show_camera_view_area"
  | "show_farmbot"
  | "show_first_party_farmware"
  | "show_historic_points"
  | "show_images"
  | "show_motor_plot"
  | "show_pins"
  | "show_plants"
  | "show_points"
  | "show_soil_interpolation_map"
  | "show_sensor_readings"
  | "show_moisture_interpolation_map"
  | "show_spread"
  | "show_weeds"
  | "show_zones"
  | "stub_config"
  | "time_format_24_hour"
  | "time_format_seconds"
  | "user_interface_read_only_mode"
  | "view_celery_script"
  | "x_axis_inverted"
  | "xy_swap"
  | "y_axis_inverted"
  | "z_axis_inverted";
