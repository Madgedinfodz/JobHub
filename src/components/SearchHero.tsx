import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Briefcase } from "lucide-react";
import { motion } from "motion/react";

interface SearchHeroProps {
  onSearch: (query: string) => void;
}

export function SearchHero({ onSearch }: SearchHeroProps) {
  return (
    <div className="relative py-16 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 -z-10" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -ml-48 -mb-48" />
      
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black tracking-tight mb-6"
        >
          ابحث عن <span className="text-primary">وظيفة أحلامك</span> <br />
          بكل سهولة وذكاء
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto"
        >
          نستخدم أحدث تقنيات الذكاء الاصطناعي لمساعدتك في العثور على الفرص التي تناسب مهاراتك وخبراتك بدقة متناهية.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-background p-2 rounded-2xl shadow-xl border border-border/50 flex flex-col md:flex-row gap-2"
        >
          <div className="flex-1 flex items-center px-4 gap-3 border-b md:border-b-0 md:border-l border-border/50 py-2">
            <Search className="w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="المسمى الوظيفي، مهارات، أو شركة..." 
              className="border-0 focus-visible:ring-0 text-lg p-0 h-auto placeholder:text-muted-foreground/50"
              onKeyDown={(e) => {
                if (e.key === 'Enter') onSearch(e.currentTarget.value);
              }}
            />
          </div>
          <div className="flex-1 flex items-center px-4 gap-3 py-2">
            <MapPin className="w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="المدينة أو المنطقة..." 
              className="border-0 focus-visible:ring-0 text-lg p-0 h-auto placeholder:text-muted-foreground/50"
            />
          </div>
          <Button className="md:w-32 py-6 text-lg font-bold" onClick={() => {
            const input = document.querySelector('input') as HTMLInputElement;
            onSearch(input.value);
          }}>
            بحث
          </Button>
        </motion.div>

        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          <span>شائع:</span>
          <button className="hover:text-primary transition-colors">مطور برمجيات</button>
          <button className="hover:text-primary transition-colors">مصمم واجهات</button>
          <button className="hover:text-primary transition-colors">مدير مشاريع</button>
          <button className="hover:text-primary transition-colors">تسويق رقمي</button>
        </div>
      </div>
    </div>
  );
}
