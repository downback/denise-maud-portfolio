import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type ActivityItem = {
  action: "add" | "update" | "delete"
  area: "Main Page" | "Works" | "Biography"
  date: string
}

const activities: ActivityItem[] = [
  { action: "update", area: "Main Page", date: "Mar 12, 2025" },
  { action: "add", area: "Works", date: "Mar 08, 2025" },
  { action: "delete", area: "Biography", date: "Feb 27, 2025" },
  { action: "update", area: "Works", date: "Feb 19, 2025" },
]

const actionLabels: Record<ActivityItem["action"], string> = {
  add: "add new",
  update: "update",
  delete: "delete",
}

const actionBadgeClasses: Record<ActivityItem["action"], string> = {
  add: "bg-emerald-100 text-emerald-700",
  update: "bg-orange-100 text-orange-700",
  delete: "bg-red-100 text-red-700",
}

export default function AdminRecentActivityPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity, index) => (
            <li
              key={`${activity.action}-${activity.area}-${activity.date}-${index}`}
              className="flex items-center justify-between gap-4 text-sm"
            >
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "rounded-full px-2 py-1 text-xs uppercase tracking-wide",
                    actionBadgeClasses[activity.action]
                  )}
                >
                  {actionLabels[activity.action]}
                </span>
                <span className="font-medium">{activity.area}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {activity.date}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
