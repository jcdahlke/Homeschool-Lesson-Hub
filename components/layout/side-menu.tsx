import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export function SideMenu() {
    return (
        <aside className="hidden w-64 shrink-0 lg:block">
          <Card className="h-full">
            <CardHeader className="border-b py-3">
              <CardTitle className="text-xs font-semibold tracking-widest text-muted-foreground">
                MENU
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-3">
              <nav className="space-y-1 text-sm">
                <button className="flex w-full items-center gap-2 rounded-md bg-brandGreen/10 px-3 py-2 text-left font-medium text-brandGreen">
                  Lessons
                </button>
                {/* Future menu items */}
                {/* <button className="w-full rounded-md px-3 py-2 text-left text-muted-foreground hover:bg-muted">
                  My Saved Lessons
                </button> */}
              </nav>
            </CardContent>
          </Card>
        </aside>
    )
}