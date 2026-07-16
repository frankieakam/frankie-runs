export type Size = "sm" | "md" | "lg";

export type Tone = "ink" | "paper";

export type ButtonVariant = "primary" | "secondary" | "ghost";

export type PolymorphicProps<E extends React.ElementType> = {
  as?: E;
};
