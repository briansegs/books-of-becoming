import { Control, FieldValues, Path } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/features/shared/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/features/shared/components/ui/select'
import { ScrollArea } from '@radix-ui/react-scroll-area'

export type SelectFieldProps<T extends FieldValues> = {
  label: string
  control: Control<T>
  name: Path<T>
  items: Record<string, unknown>
  preview?: (value: string) => React.ReactNode
}

export function JournalDialogSelectField<T extends FieldValues>({
  label,
  control,
  name,
  items,
  preview,
}: SelectFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="flex w-full items-center justify-between">
            {preview?.(field.value)}
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-[180px] capitalize">{field.value}</SelectTrigger>
              </FormControl>
              <SelectContent>
                <ScrollArea className="max-h-72">
                  {Object.entries(items).map(([key, _value]) => (
                    <SelectItem key={key} value={key} className="capitalize">
                      {preview ? (
                        <div className="flex items-center gap-2">
                          {preview(key)}
                          <span>{key}</span>
                        </div>
                      ) : (
                        key
                      )}
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
