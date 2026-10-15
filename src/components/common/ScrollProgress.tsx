/** Barra fina de progreso de lectura bajo la navbar. Se anima con CSS ligado al scroll (sin JS). */
export function ScrollProgress() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5">
      <div className="scroll-progress h-full w-full bg-action-primary" />
    </div>
  );
}
