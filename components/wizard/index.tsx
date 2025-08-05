import { CheckIcon } from "lucide-react";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  ReactNode,
} from "react";

const noop = (...args: any[]): any => {};

type WizardContextType = {
  goBack: () => void;
  goForward: () => void;
  skip: () => void;
  canForward: boolean;
  canBackward: boolean;
  canSkip: boolean;
  blocked: boolean;
  setBlocked: (blocked: boolean) => void;
  isCompleted: boolean;
  helpContent: ReactNode;
  setHelpContent: (content: ReactNode) => void;
  isLastStage: boolean;
  goStage:()=>void
};

const WizardContext = createContext<WizardContextType>({
  goBack: noop,
  goForward: noop,
  skip: noop,
  canForward: true,
  canBackward: false,
  canSkip: false,
  blocked: false,
  setBlocked: noop,
  isCompleted: false,
  helpContent: null,
  setHelpContent: noop,
  isLastStage: false,
  goStage:noop
});

export const useWizardNav = () => {
  return useContext(WizardContext);
};

type InnerProps = {
  handleComplete?: () => void;
  stages: any;
  resetAll?: () => void;
};

type Props = InnerProps;

export function WizardModal({
  handleComplete = noop,
  stages,
  resetAll = noop,
}: Props) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [blocked, setBlocked] = useState(false);

  const maxStages = stages.length;
  const isCompleted = currentStageIndex === maxStages - 1 && !blocked;
  const currentStage = stages[currentStageIndex];
  const canBackward = currentStageIndex > 0;
  const canForward = currentStageIndex < maxStages - 1 && !blocked;
  const canSkip = !!currentStage.skippable;
  const isLastStage = currentStageIndex === maxStages - 1;

  const reset = useCallback(() => {
    setBlocked(false);
    setCurrentStageIndex(0);
    resetAll();
  }, [resetAll]);

  const complete = useCallback(() => {
    reset();
    handleComplete();
  }, [reset, handleComplete]);

  const goBack = useCallback(() => {
    if (canBackward) {
      setBlocked(false);
      setCurrentStageIndex((prev) => prev - 1);
    }
  }, [canBackward]);

  const goStage =(index)=>{
    setCurrentStageIndex(index)
  }

  const goForward = useCallback(() => {
    if (canForward) {
      setCurrentStageIndex((prev) => prev + 1);
    } else if (isLastStage) {
      complete();
    }
  }, [canForward, isLastStage, complete]);

  const skip = useCallback(() => {
    if (canSkip) {
      goForward();
    }
  }, [canSkip, goForward]);

  return (
    <div className="relative flex flex-col">
      <nav aria-label="Progress">
        <ol
          role="list"
          className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0"
        >
          {stages.map((step, stepIdx) => (
            <li key={step.name} className="relative md:flex md:flex-1">
              {stepIdx < currentStageIndex || isCompleted ? (
                <a href={step.href} className="group flex w-full items-center">
                  <span className="flex items-center px-6 py-4 text-sm font-medium">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary group-hover:bg-primary">
                      <CheckIcon
                        aria-hidden="true"
                        className="h-6 w-6 text-white"
                      />
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-900">
                      {step.name}
                    </span>
                  </span>
                </a>
              ) : stepIdx === currentStageIndex ? (
                <a
                  href={step.href}
                  aria-current="step"
                  className="flex items-center px-6 py-4 text-sm font-medium"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-primary">
                    <span className="text-primary">{step.id}</span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-primary">
                    {step.name}
                  </span>
                </a>
              ) : (
                <a href={step.href} className="group flex items-center">
                  <span className="flex items-center px-6 py-4 text-sm font-medium">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400">
                      <span className="text-gray-500 group-hover:text-gray-900">
                        {step.id}
                      </span>
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                      {step.name}
                    </span>
                  </span>
                </a>
              )}

              {stepIdx !== stages.length - 1 && (
                <div
                  aria-hidden="true"
                  className="absolute right-0 top-0 hidden h-full w-5 md:block"
                >
                  <svg
                    fill="none"
                    viewBox="0 0 22 80"
                    preserveAspectRatio="none"
                    className="h-full w-full text-gray-300"
                  >
                    <path
                      d="M0 -2L20 40L0 82"
                      stroke="currentcolor"
                      vectorEffect="non-scaling-stroke"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <div className="flex flex-1 overflow-hidden pt-8 justify-center items-start">
        <WizardContext.Provider
          value={useMemo(
            () => ({
              goBack,
              goForward,
              skip,
              canForward,
              canBackward,
              canSkip,
              blocked,
              setBlocked,
              isCompleted,
              isLastStage,
              helpContent: null, // Or use a more meaningful value
              setHelpContent: noop, // Or use a more meaningful function
              goStage
            }),
            [
              goBack,
              goForward,
              skip,
              canForward,
              canBackward,
              canSkip,
              blocked,
              setBlocked,
              isCompleted,
              isLastStage,
              goStage
            ]
          )}
        >
          {currentStage.component}
        </WizardContext.Provider>
      </div>
    </div>
  );
}
