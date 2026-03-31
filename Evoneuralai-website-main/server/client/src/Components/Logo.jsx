import { in3dFontStyle, TrademarkSymbol } from './In3DTypography';

export default function Logo() {
  return (
    <div className="flex items-center">
      <span className="text-2xl tracking-[0.1rem]" style={in3dFontStyle}>
        <span className="text-foreground">In</span>
        <span className="text-primary">3D.ai</span>
        <TrademarkSymbol />
      </span>
    </div>
  );
}
