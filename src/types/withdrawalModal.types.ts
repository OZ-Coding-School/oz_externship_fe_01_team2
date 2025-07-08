// types/WithdrawalModal.types.ts

export type WithdrawalModalProps = {
  onClose: () => void
  onConfirm: (data: { reason: string; comment: string }) => void
}
