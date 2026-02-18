import { Component, Input } from '@angular/core'
import { Experience } from '../../../../shared/interface/IAgnibhaProfile.interface'
import { NgStyle } from '@angular/common'


@Component({
  selector: 'app-experience-timeline-component',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './experience-timeline-component.component.html',
  styleUrl: './experience-timeline-component.component.css'
})
export class ExperienceTimelineComponentComponent {
  @Input() experiences: Experience[] = []
  @Input() activeCompany: string | null = null

  readonly retirementAge = 60
  readonly birthYear = 1998 // derived earlier
  readonly presentDate = new Date()

  /** ---------- DATE HELPERS ---------- */

  private monthMap: Record<string, number> = {
    january: 0,
    february: 1,
    march: 2,
    april: 3,
    may: 4,
    june: 5,
    july: 6,
    august: 7,
    september: 8,
    october: 9,
    november: 10,
    december: 11
  }

  private toMonthIndex (year: number, month: number): number {
    return year * 12 + month
  }

  private parseDate (value: string): number {
    if (value === 'Present') {
      return this.toMonthIndex(
        this.presentDate.getFullYear(),
        this.presentDate.getMonth()
      )
    }

    const [year, month] = value.split(' ')
    return this.toMonthIndex(+year, this.monthMap[month.toLowerCase()])
  }

  /** ---------- TIMELINE RANGE ---------- */

  get startMonth (): number {
    return Math.min(
      ...this.experiences.map(exp => {
        const [start] = exp.duration.split('-').map(v => v.trim())
        return this.parseDate(start)
      })
    )
  }

  get endMonth (): number {
    return this.toMonthIndex(this.birthYear + this.retirementAge, 0)
  }

  get totalMonths (): number {
    return this.endMonth - this.startMonth
  }

  /** ---------- MARKERS (company switches + present) ---------- */

  get markers (): number[] {
    const set = new Set<number>()

    set.add(this.startMonth)

    this.experiences.forEach(exp => {
      const [, end] = exp.duration.split('-').map(v => v.trim())
      if (end !== 'Present') {
        set.add(this.parseDate(end))
      }
    })

    set.add(this.parseDate('Present'))

    return Array.from(set).sort((a, b) => a - b)
  }

  shouldShowMarker (month: number, index: number): boolean {
    if (index === 0 || index === this.markers.length - 1) return true

    const prev = this.markers[index - 1]
    const next = this.markers[index + 1]

    // at least ~2 years apart
    return month - prev >= 24 && next - month >= 24
  }

  /** ---------- POSITIONING ---------- */

  getPosition (month: number): string {
    return `${((month - this.startMonth) / this.totalMonths) * 100}%`
  }

  getSegmentStyle (exp: Experience) {
    const [start, end] = exp.duration.split('-').map(v => v.trim())

    const startMonth = this.parseDate(start)
    const endMonth =
      end === 'Present' ? this.parseDate('Present') : this.parseDate(end)

    return {
      left: this.getPosition(startMonth),
      width: `${((endMonth - startMonth) / this.totalMonths) * 100}%`
    }
  }

  /** ---------- LABEL TEXT ---------- */

  formatMarker (monthIndex: number): string {
    const year = Math.floor(monthIndex / 12)
    return year === this.presentDate.getFullYear() ? 'Present' : String(year)
  }
}
