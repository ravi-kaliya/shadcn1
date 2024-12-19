import {
  integer,
  varchar,
  pgTable,
  serial,
  text,
  timestamp,
  jsonb,
  boolean,
} from 'drizzle-orm/pg-core';

export const Users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  created_at: timestamp('create_at').defaultNow().notNull(),
});

export const Reports = pgTable('reports', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id')
    .references(() => Users.id)
    .notNull(),
  location: text('location').notNull(),
  wasteType: varchar('waste_type', { length: 255 }).notNull(),
  amount: varchar('amount', { length: 255 }).notNull(),
  imageUrl: text('image_url'),
  verificationResult: jsonb('verification_result'),
  status: varchar('status', { length: 255 }).notNull().default('pending'),
  created_at: timestamp('create_at').defaultNow().notNull(),
  collectorId: integer('collectorId').references(() => Users.id),
});

export const Rewards = pgTable('rewards', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => Users.id)
    .notNull(),
  points: integer('points').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  isavailable: boolean('is_available').notNull().default(true),
  description: text('description'),
  name: varchar('name', { length: 255 }).notNull(),
  collectionInfo: text('collection_info').notNull(),
});

export const CollectedWaste = pgTable('collected_waste', {
  id: serial('id').primaryKey(),
  reportId: integer('report_id').references(()=>Reports.id).notNull(),
  collectorId: integer('collector_id').references(()=>Users.id).notNull(),
  collectionDate:timestamp('collection_date').notNull()
});
