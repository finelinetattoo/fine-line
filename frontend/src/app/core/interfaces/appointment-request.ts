export interface AppointmentRequest {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  is_adult: boolean;
  is_first_time: boolean;
  medical_conditions?: string;
  instagram_handle?: string;
  tattoo_description: string;
  body_part: string;
  size_height_cm: number;
  size_width_cm: number;
  image_1_url: string;
  image_2_url: string;
  image_3_url: string;
  availability: 'morning' | 'afternoon' | 'weekend' | 'any';
  additional_comments?: string;
  createdAt: string;
  isRead: boolean;
}
