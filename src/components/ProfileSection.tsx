import { UserProfile } from "@/src/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Briefcase, Code2, History } from "lucide-react";

interface ProfileSectionProps {
  profile: UserProfile;
}

export function ProfileSection({ profile }: ProfileSectionProps) {
  return (
    <Card className="border-border/50">
      <CardHeader className="flex flex-row items-center gap-4 pb-4">
        <Avatar className="w-16 h-16 border-2 border-primary/20">
          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.name}`} />
          <AvatarFallback>{profile.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-xl">{profile.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{profile.title}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <section>
          <div className="flex items-center gap-2 text-sm font-bold mb-2">
            <User className="w-4 h-4 text-primary" /> نبذة تعريفية
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {profile.bio}
          </p>
        </section>

        <section>
          <div className="flex items-center gap-2 text-sm font-bold mb-2">
            <Code2 className="w-4 h-4 text-primary" /> المهارات
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, i) => (
              <Badge key={i} variant="secondary" className="font-normal">
                {skill}
              </Badge>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 text-sm font-bold mb-2">
            <History className="w-4 h-4 text-primary" /> الخبرة
          </div>
          <p className="text-sm text-muted-foreground">
            {profile.experience}
          </p>
        </section>
      </CardContent>
    </Card>
  );
}
