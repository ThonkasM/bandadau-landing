export const queryKeys = {
  events: {
    all: () => ['events'] as const,
    public: (locale?: string) => (locale ? (['events', 'public', locale] as const) : (['events', 'public'] as const)),
  },
};
