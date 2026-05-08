import { color, font } from "../../../_lib/tokens";

/* WOW HR module — competitor analysis block. Three product cards
   (BambooHR, Personio, Bob) on a cream backdrop with a heading row. */

const NAVY = color.navy;
const GRAY_NAVY = color.grayNavy;
const CREAM_LIGHTER = color.creamLight;
const SOLWAY = font.solway;

const COMPETITORS: CompetitorCardProps[] = [
  {
    name: "BambooHR",
    strength: "Complete HRIS",
    strengthDetail: "Native payroll and benefits in one place",
    gap: "Weak on engagement and customisation",
    whatWeTook: "Payroll and profile data patterns",
    whatWeTookDetail: "Field structure for salary and working hours",
  },
  {
    name: "Personio",
    strength: "Process automation",
    strengthDetail: "Strong compliance and workflow logic",
    gap: "Underserves culture and social side",
    whatWeTook: "Multi-role approval and handoff",
    whatWeTookDetail: "Shape of the Request for Resources flow",
  },
  {
    name: "Bob",
    strength: "Employee experience",
    strengthDetail: "Compensation and social as core",
    gap: "Costly and lighter on compliance depth",
    whatWeTook: "Feed as connective tissue",
    whatWeTookDetail: "Keeping users in the loop across a complex platform",
  },
];

type CompetitorCardProps = {
  name: string;
  strength: string;
  strengthDetail: string;
  gap: string;
  whatWeTook: string;
  whatWeTookDetail: string;
};

function CompetitorCard({
  name,
  strength,
  strengthDetail,
  gap,
  whatWeTook,
  whatWeTookDetail,
}: CompetitorCardProps) {
  return (
    <div
      className="flex flex-col items-center w-full md:w-[281.379px]"
      style={{ gap: 32 }}
    >
      <div
        className="w-full flex items-center justify-center"
        style={{
          backgroundColor: NAVY,
          height: 78,
          borderRadius: 12,
          padding: 8,
        }}
      >
        <p
          className="text-center"
          style={{
            color: CREAM_LIGHTER,
            fontFamily: SOLWAY,
            fontWeight: 400,
            fontSize: 28,
            lineHeight: "36px",
          }}
        >
          {name}
        </p>
      </div>
      <CardField label="STRENGTH" title={strength} subtitle={strengthDetail} />
      <CardDivider />
      <CardField label="GAP" subtitle={gap} />
      <CardDivider />
      <CardField
        label="WHAT WE TOOK"
        title={whatWeTook}
        subtitle={whatWeTookDetail}
      />
    </div>
  );
}

function CardField({
  label,
  title,
  subtitle,
}: {
  label: string;
  title?: string;
  subtitle: string;
}) {
  return (
    <div className="w-full flex flex-col items-start gap-[16px]">
      <p
        className="w-full"
        style={{
          color: GRAY_NAVY,
          fontFamily: SOLWAY,
          fontWeight: 400,
          fontSize: 14,
          lineHeight: "20px",
          letterSpacing: "0.25px",
        }}
      >
        {label}
      </p>
      <div className="w-full flex flex-col items-center gap-[8px] text-center">
        {title && (
          <p
            className="w-full"
            style={{
              color: NAVY,
              fontFamily: SOLWAY,
              fontWeight: 700,
              fontSize: 16,
              lineHeight: "24px",
              letterSpacing: "0.15px",
            }}
          >
            {title}
          </p>
        )}
        <p
          className="w-full"
          style={{
            color: NAVY,
            fontFamily: SOLWAY,
            fontWeight: 500,
            fontSize: 14,
            lineHeight: "20px",
            letterSpacing: "0.1px",
          }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}

function CardDivider() {
  return (
    <span
      aria-hidden
      className="w-full"
      style={{ height: 1, backgroundColor: "#E0DFDC" }}
    />
  );
}

export default function CompetitorBlock() {
  return (
    <div
      className="w-full overflow-hidden flex flex-col items-center relative px-[20px] py-[32px] md:px-[30px] md:py-[44px]"
      style={{
        backgroundColor: CREAM_LIGHTER,
        borderRadius: 8,
        gap: 32,
      }}
    >
      <div
        className="flex flex-col items-center text-center"
        style={{ gap: 8 }}
      >
        <p
          style={{
            color: NAVY,
            fontFamily: SOLWAY,
            fontWeight: 400,
            fontSize: 24,
            lineHeight: "32px",
          }}
        >
          What we borrowed from each
        </p>
        <p
          style={{
            color: NAVY,
            fontFamily: SOLWAY,
            fontWeight: 400,
            fontSize: 16,
            lineHeight: "24px",
            letterSpacing: "0.15px",
          }}
        >
          Competitor analysis → design decisions in WOW&rsquo;s HR module
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-stretch md:items-start justify-center w-full gap-[40px] md:gap-[90px]">
        {COMPETITORS.map((c) => (
          <CompetitorCard key={c.name} {...c} />
        ))}
      </div>
    </div>
  );
}
