import React from 'react'

export type RoleFilter = 'all' | 'admin' | 'teacher' | 'student' | 'sales'

export interface OldVsNewItem {
  category: string
  oldWay: string
  newWay: string
}

export interface FeatureModule {
  id: string
  role: RoleFilter
  title: string
  tagline: string
  description: string
  badge: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  highlights: string[]
}

export interface TourTabMetric {
  label: string
  val: string
  trend: string
}

export interface TourTab {
  id: string
  label: string
  title: string
  desc: string
  metrics: TourTabMetric[]
}

export interface FaqItem {
  q: string
  a: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  image: string
  github?: string
  linkedin?: string
  bio?: string
}

export interface DemoForm {
  name: string
  phone: string
  centerName: string
  studentsCount: string
  preferredTime: string
}
