import { RotationTip } from '../rotation-tip';
import { RotationTipType } from '../rotation-tip-type';
import { SimulationResult } from '../../simulation/simulation-result';
import { BasicTouch } from '../../model/actions/quality/basic-touch';
import { AdvancedTouch } from '../../model/actions/quality/advanced-touch';

export class UseAdvancedTouchInstead extends RotationTip {

  private matchingIndex: number;

  constructor() {
    super(RotationTipType.WARNING, 'Use_advanced_touch_instead');
  }

  canBeAppliedTo(simulationResult: SimulationResult): boolean {
    return this.simulationHasAction(simulationResult, BasicTouch) && this.simulationHasAction(simulationResult, AdvancedTouch);
  }

  messageParams(simulationResult: SimulationResult): any {
    return { index: this.matchingIndex };
  }

  matches(simulationResult: SimulationResult): boolean {
    const basicTouchIndexes = this.getAllActionIndexes(simulationResult, BasicTouch);
    const advancedTouchIndexes = this.getAllActionIndexes(simulationResult, AdvancedTouch);
    return basicTouchIndexes.some(index => {
      const matches = advancedTouchIndexes.some(advIndex => advIndex === index + 1);
      if (matches) {
        this.matchingIndex = index + 1;
      }
      return matches;
    });
  }
}
