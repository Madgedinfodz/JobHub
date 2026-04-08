import { Job } from "@/src/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Building2, Clock, Banknote } from "lucide-react";
import { motion } from "motion/react";

interface JobCardProps {
  job: Job;
  onClick: (job: Job) => void;
}

export function JobCard({ job, onClick }: JobCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="cursor-pointer"
      onClick={() => onClick(job)}
    >
      <Card className="overflow-hidden border-border/50 hover:border-primary/50 transition-colors">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex gap-3">
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-secondary-foreground font-bold text-xl">
                {job.company[0]}
              </div>
              <div>
                <CardTitle className="text-lg leading-tight">{job.title}</CardTitle>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <Building2 className="w-3 h-3" />
                  <span>{job.company}</span>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="font-normal">
              {job.type}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Banknote className="w-3 h-3" />
              <span>{job.salary}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{job.postedAt}</span>
            </div>
          </div>
          <p className="mt-3 text-sm line-clamp-2 text-muted-foreground leading-relaxed">
            {job.description}
          </p>
        </CardContent>
        <CardFooter className="pt-0 flex gap-2">
          {job.requirements.slice(0, 3).map((req, i) => (
            <Badge key={i} variant="outline" className="text-[10px] font-normal px-2 py-0">
              {req}
            </Badge>
          ))}
          {job.requirements.length > 3 && (
            <span className="text-[10px] text-muted-foreground">+{job.requirements.length - 3}</span>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
