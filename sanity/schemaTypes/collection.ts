import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    defineField({
      name: 'collectionName',
      title: 'Collection Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'collectionType',
      title: 'Collection Type',
      type: 'string',
      options: {
        list: [
          { title: 'Private', value: 'private' },
          { title: 'Public', value: 'public' },
        ],
        layout: 'radio',
      },
      initialValue: 'private',
    }),
    defineField({
      name: 'images',
      title: 'Uploaded Images',
      type: 'array',
      of: [{ type: 'image' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'user',
      title: 'Created By',
      type: 'reference',
      to: [{ type: 'user' }], // assuming you already have a 'user' schema
      validation: (Rule) => Rule.required(),
    }),
  ],
})
