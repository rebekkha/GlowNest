/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SkinType = 'Oily' | 'Dry' | 'Normal' | 'Combination';

export interface UserProfile {
  name: string;
  age: string;
  phone: string;
  address: string;
  pinCode: string;
  profilePic: string | null;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  benefit: string;
  image: string;
  suitableFor: SkinType[];
}
