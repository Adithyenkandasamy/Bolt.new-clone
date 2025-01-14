import { defineSchema, defineTable } from 'convex/server'; // Ensure defineTable is imported
import { v } from 'convex/values';

export default defineSchema({
    users: defineTable({
        name: v.string(),
        email: v.string(),
        picture: v.string(),
        uid: v.string()
    })
});